class RemoveHeaderFromPosts < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :header, :string
  end
end
