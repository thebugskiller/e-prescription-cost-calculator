# class Medication < ApplicationRecord
#   has_many :dosages, dependent: :destroy

#   scope :find_by_id!, ->(id) { find_by!(id: id) }
# end



class Medication < ApplicationRecord
  has_many :dosages, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :unit_price, presence: true, numericality: { greater_than: 0 }

  # Custom scope for finding by ID
  scope :find_by_id!, ->(id) { find_by!(id: id) }
end
