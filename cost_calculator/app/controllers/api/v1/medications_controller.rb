class Api::V1::MedicationsController < ApplicationController
	def index
    medications = Medication.includes(:dosages)
    if medications.blank?
      return render json: { error: "No medications found" }, status: :not_found
    end
    grouped_medications = medications.group_by(&:name).map do |name, meds|
      {
        id: meds.first.id,
        name: name,
        unit_price: nil,
        dosages: meds.flat_map do |med|
          med.dosages.map do |dosage|
            {
              id: dosage.id,
              dosage_amount: dosage.dosage_amount,
              frequency: dosage.frequency,
              default_duration: dosage.default_duration,
              unit_price: med.unit_price,
              medication_id: med.id
            }
          end
        end
      }
    end

    render json: grouped_medications
  end
end