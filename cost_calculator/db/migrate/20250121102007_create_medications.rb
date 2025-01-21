class CreateMedications < ActiveRecord::Migration[7.1]
  def change
    create_table :medications do |t|
      t.string :name, null: false, default: '', limit: 255
      t.decimal :unit_price, null: false, precision: 10, scale: 2

      t.timestamps
    end

    add_index :medications, :name
  end
end
