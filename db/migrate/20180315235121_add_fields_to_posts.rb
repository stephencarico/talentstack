class AddFieldsToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :pitch, :text
    add_column :posts, :seeking, :text
  end
end
