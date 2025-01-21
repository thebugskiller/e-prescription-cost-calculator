# class PrescriptionDosage < ApplicationRecord
#   belongs_to :prescription
#   belongs_to :dosage

#   validates :duration, presence: true
# end



class PrescriptionDosage < ApplicationRecord
  belongs_to :prescription
  belongs_to :dosage

  # Validations
  validates :duration, presence: true
end
