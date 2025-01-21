# class Prescription < ApplicationRecord
#   has_many :prescription_dosages
#   has_many :dosages, through: :prescription_dosages
# end



class Prescription < ApplicationRecord
  has_many :prescription_dosages
  has_many :dosages, through: :prescription_dosages

  # Validations
  validates :total, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
