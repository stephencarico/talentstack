class ApplicationController < ActionController::API
  include Knock::Authenticable

  def authenticate_user
    # unless my user is an admin, show unauthorized
    unless current_user
      render json: {message: "Unauthorized"}, status: :unauthorized
    end
  end
end
