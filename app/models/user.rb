class User < ApplicationRecord
  has_many :posts
  has_many :comments

  mount_uploader :image, ImageUploader

  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  def as_json
    {
      id: id,
      first_name: first_name,
      last_name: last_name,
      full_name: first_name + " " + last_name,
      profile_picture: profile_picture,
      bio: bio,
      posts: posts.as_json
    }
  end
end
