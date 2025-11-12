class CreateExperiences < ActiveRecord::Migration[7.1]
  def change
    create_table :experiences do |t|
      t.string :title
      t.string :country
      t.decimal :price
      t.text :description

      t.timestamps
    end
  end
end
