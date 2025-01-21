# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_01_21_105057) do
  create_table "dosages", force: :cascade do |t|
    t.string "dosage_amount", limit: 255, default: "", null: false
    t.string "frequency", limit: 255, default: "", null: false
    t.string "default_duration", limit: 255, default: "", null: false
    t.integer "medication_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medication_id"], name: "index_dosages_on_medication_id"
  end

  create_table "medications", force: :cascade do |t|
    t.string "name", limit: 255, default: "", null: false
    t.decimal "unit_price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_medications_on_name"
  end

  create_table "prescription_dosages", force: :cascade do |t|
    t.string "duration", limit: 255, default: "", null: false
    t.integer "prescription_id", null: false
    t.integer "dosage_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dosage_id"], name: "index_prescription_dosages_on_dosage_id"
    t.index ["prescription_id"], name: "index_prescription_dosages_on_prescription_id"
  end

  create_table "prescriptions", force: :cascade do |t|
    t.decimal "total", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "dosages", "medications"
  add_foreign_key "prescription_dosages", "dosages"
  add_foreign_key "prescription_dosages", "prescriptions"
end
