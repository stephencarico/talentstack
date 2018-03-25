class User < ApplicationRecord
  has_many :posts
  has_many :comments

  has_attached_file :profile_picture
    
  validates_attachment :profile_picture,
    content_type: {
      content_type: ["image/jpeg", "image/gif", "image/png"]
    }

  # mount_uploader :profile_picture, ImageUploader

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
      bio: bio,
      profile_picture: profile_picture,
      posts: posts.as_json
    }
  end
end
