# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
medications = [
  {
    name: "Metformin",
    unit_price: 5.0,
    dosages: [
      { dosage_amount: "500 mg", frequency: "Once daily", default_duration: "30 days" },
      { dosage_amount: "500 mg", frequency: "Twice daily", default_duration: "30 days" },
      { dosage_amount: "1000 mg", frequency: "Once daily", default_duration: "30 days" }
    ]
  },
  {
    name: "Phentermine",
    unit_price: 15.0,
    dosages: [
      { dosage_amount: "15 mg", frequency: "Once daily", default_duration: "14 days" },
      { dosage_amount: "30 mg", frequency: "Once daily", default_duration: "14 days" },
      { dosage_amount: "37.5 mg", frequency: "Once daily", default_duration: "14 days" }
    ]
  },
  {
    name: "Naltrexone",
    unit_price: 12.0,
    dosages: [
      { dosage_amount: "25 mg", frequency: "Once daily", default_duration: "7 days" },
      { dosage_amount: "50 mg", frequency: "Once daily", default_duration: "28 days" },
      { dosage_amount: "50 mg", frequency: "Twice daily", default_duration: "28 days" }
    ]
  },
  {
    name: "Wellbutrin",
    unit_price: 10.0,
    dosages: [
      { dosage_amount: "100 mg", frequency: "Twice daily", default_duration: "14 days" },
      { dosage_amount: "150 mg", frequency: "Once daily", default_duration: "14 days" },
      { dosage_amount: "150 mg", frequency: "Twice daily", default_duration: "14 days" }
    ]
  },
  {
    name: "Topiramate",
    unit_price: 8.0,
    dosages: [
      { dosage_amount: "25 mg", frequency: "Once daily", default_duration: "30 days" },
      { dosage_amount: "25 mg", frequency: "Twice daily", default_duration: "30 days" },
      { dosage_amount: "50 mg", frequency: "Twice daily", default_duration: "30 days" }
    ]
  },
  {
    name: "Ozempic",
    unit_price: 40.0,
    dosages: [
      { dosage_amount: "0.25 mg", frequency: "Once weekly", default_duration: "4 weeks" },
      { dosage_amount: "0.5 mg", frequency: "Once weekly", default_duration: "4 weeks" },
      { dosage_amount: "1 mg", frequency: "Once weekly", default_duration: "4 weeks" }
    ]
  },
  {
    name: "Bupropion",
    unit_price: 2.50,
    dosages: [
      { dosage_amount: "75 mg", frequency: "Once daily", default_duration: "21 days" }
    ]
  },
  {
    name: "Bupropion",
    unit_price: 3.0,
    dosages: [
      { dosage_amount: "150 mg", frequency: "Once daily", default_duration: "21 days" }
    ]
  },
  {
    name: "Bupropion",
    unit_price: 3.50,
    dosages: [
      { dosage_amount: "150 mg", frequency: "Twice daily", default_duration: "21 days" }
    ]
  }
]

medications.each do |medication|
	med = Medication.find_or_create_by!(name: medication[:name], unit_price: medication[:unit_price])
	dosages = medication[:dosages]
	dosages.each do |dose|
		Dosage.find_or_create_by!(dosage_amount: dose[:dosage_amount], frequency: dose[:frequency], default_duration: dose[:default_duration], medication_id: med.id)
	end
end
