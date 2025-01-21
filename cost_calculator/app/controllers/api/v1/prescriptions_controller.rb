class Api::V1::PrescriptionsController < ApplicationController
	include PrescriptionsHelper

	before_action :verify_medicaitions

	def create
		total_cost = get_total_cost(@new_medications)
	  
		ActiveRecord::Base.transaction do
			prescription = Prescription.create!(total: total_cost)
	  
			@new_medications.each do |medication_data|
				med_id = medication_data[:id]
				dosage_data = medication_data[:dosage]
		
				PrescriptionDosage.create!(
					prescription: prescription,
					dosage_id: dosage_data[:id],
					duration: dosage_data[:duration]
				)
		  	end
		end #exc
	  
		render json: { message: "Prescription saved successfully!" }, status: :ok
	end


	def optimize_cost
		expected_budget = params[:expected_budget].to_f

		total_cost = get_total_cost(@new_medications)
		minimum_cost = get_total_cost(@new_medications, min_budget=true)
		if expected_budget == 0 or not expected_budget
			return render json: "Please enter a valid budget!"
		end
		
		if expected_budget != 0
			optimized_medications = optimize(@new_medications, expected_budget)
			total_cost = get_total_cost(optimized_medications)
			return render json: {"medications" => optimized_medications, "total_cost" => total_cost, "minimum_cost" => minimum_cost}
		else
			return render json: "Already under selected budget!"
		end
	end

	def calculate_cost
		minimum_cost = get_total_cost(@new_medications, min_budget=true)
		total_cost = get_total_cost(@new_medications)
		render json: {"medications" => @new_medications, "total_cost" => total_cost, "minimum_cost" => minimum_cost}
	end

	private

	def verify_medicaitions
        medications = params[:medications]
		@new_medications = get_medication_details(medications)
		if @new_medications == nil
			return render json: { error: "Invalid Medication/Dosage" }, status: :not_found
		end
	end
end