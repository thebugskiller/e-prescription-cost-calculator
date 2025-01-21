module PrescriptionsHelper
    extend ActiveSupport::Concern

	def unit_mapper(unit)
		units = {"daily"=> 1, "monthly"=> 1, "weekly"=> 1, "day" => 1, "days"=> 1, "weeks"=> 1, "months"=> 30}
		units[unit] || 1
	end

	def qty_mapper(unit)
		units = {"Once"=> 1, "Twice"=> 2, "Thrice"=> 3}
		units[unit] || unit.to_f
	end

	def parser(data)
		qty, unit = data.split(" ")
		qty = qty_mapper(qty)
		unit = unit_mapper(unit)
		number = qty * unit
		number
	end

	def get_cost(duration, frequency, item_price)
		duration = parser(duration)
		frequency = parser(frequency)
		cost = item_price.to_f * duration * frequency
		cost
	end


	def get_medication_details(medications)
		new_medications = []
        medications.each do |medication|
			medication_id = medication[:id]
			dosage = medication[:dosage]
			dosage_id = dosage[:id]
            duration = dosage[:duration]

			begin
				medication_obj = Medication.find(medication_id)
			rescue ActiveRecord::RecordNotFound => e
				return nil
			end

			begin
				dosage_obj = Dosage.find(dosage_id)
			rescue ActiveRecord::RecordNotFound => e
				return nil
			end

			new_medication = medication_obj.as_json.deep_symbolize_keys
			new_medication[:dosage] = dosage_obj.as_json.deep_symbolize_keys
			new_medication[:dosage][:duration] = duration
			new_medications << new_medication
        end
		new_medications
	end


	def get_total_cost(medications, min_budget=false)
		total = 0
		medications.each do |medication|
			dosage = medication[:dosage]
			duration = dosage[:duration]

			duration = "1 day" if min_budget
			cost = get_cost(duration, dosage[:frequency], medication[:unit_price])
			if parser(duration) >= 30
				ten_percent = (10 * cost) / 100
				cost = cost - ten_percent
			end
			total += cost
			medication[:total_cost] = cost.round(2)
		end
		total.round(2)
	end

	def optimize(medications, budget)
		total_cost = get_total_cost(medications)
		if total_cost > budget
			while get_total_cost(medications) > budget
				medications.each do |medication|
					dosage = medication[:dosage]
					if parser(dosage[:duration]) > 1
						dosage[:duration] = "#{parser(dosage[:duration]) - 1} days"
					end
					break if get_total_cost(medications) <= budget
				end
			end
		elsif total_cost < budget
			while get_total_cost(medications) < budget
				medications.each do |medication|
					dosage = medication[:dosage]
					dosage[:duration] = "#{parser(dosage[:duration]) + 1} days"
					break if get_total_cost(medications) >= budget
				end
			end
		end
		medications
	end
end