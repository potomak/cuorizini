require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

get '/index.html' do
  redirect '/'
end