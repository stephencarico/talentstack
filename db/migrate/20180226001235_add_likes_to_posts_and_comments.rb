class AddLikesToPostsAndComments < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :likes, :integer
    add_column :comments, :likes, :integer
  end
end
