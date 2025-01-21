class CreateDosages < ActiveRecord::Migration[7.1]
  def change
    create_table :dosages do |t|
      t.string :dosage_amount, null: false,  default: '', limit: 255
      t.string :frequency, null: false,  default: '', limit: 255
      t.string :default_duration, null: false,  default: '', limit: 255
      t.references :medication, null: false, foreign_key: true

      t.timestamps
    end
  end
end
