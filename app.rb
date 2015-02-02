require 'sinatra'
require 'sass'

get '/' do
  erb :index
end

get '/style/:name.css' do |name|
  sass :"sass/#{name}"
end
