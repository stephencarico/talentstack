class UserTokenController < Knock::AuthTokenController

  # def create
  #     render json: {
  #       jwt: auth_token.token, 
  #       user_id: User.find_by(email: params[:auth][:email]).id
  #     }, 
  #     status: :created
  #   end

end
