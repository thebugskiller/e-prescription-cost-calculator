# class Dosage < ApplicationRecord
#   belongs_to :medication
#   has_many :prescription_dosages
#   has_many :prescriptions, through: :prescription_dosages

#   scope :find_by_id!, ->(id) { find_by!(id: id) }
# end



class Dosage < ApplicationRecord
  belongs_to :medication
  has_many :prescription_dosages
  has_many :prescriptions, through: :prescription_dosages

  # Validations
  validates :dosage_amount, presence: true
  validates :frequency, presence: true
  validates :default_duration, presence: true

  # Custom scope for finding by ID
  scope :find_by_id!, ->(id) { find_by!(id: id) }
end
