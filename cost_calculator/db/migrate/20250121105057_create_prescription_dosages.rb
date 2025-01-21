class CreatePrescriptionDosages < ActiveRecord::Migration[7.1]
  def change
    create_table :prescription_dosages do |t|
      t.string :duration, null: false,  default: '', limit: 255
      t.references :prescription, null: false, foreign_key: true
      t.references :dosage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
