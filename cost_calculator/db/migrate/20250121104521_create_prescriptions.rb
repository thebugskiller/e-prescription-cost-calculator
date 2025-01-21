class CreatePrescriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :prescriptions do |t|
      t.decimal :total, null: false, precision: 10, scale: 2

      t.timestamps
    end
  end
end
