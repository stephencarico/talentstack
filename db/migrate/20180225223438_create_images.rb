class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.integer :post_id
      t.string :url

      t.timestamps
    end
  end
end
