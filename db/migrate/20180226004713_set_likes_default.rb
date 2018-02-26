class SetLikesDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :likes, :integer, default: 0
    change_column :comments, :likes, :integer, default: 0
  end
end
