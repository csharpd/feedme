require 'sinatra'
require 'rack/mobile-detect'

use Rack::MobileDetect
helpers do

  def get_layout
    # For AJAX (XMLHttpRequest) requests, don't use a layout
    if request.xhr? then
      @layout = false
      exit
    end

    # For non-AJAX (XMLHttpRequest) requests, choose correct layout
    # For each mobile device, you will need a layout_<device>.haml file
    # in the Views directory
    case request.env['X_MOBILE_DEVICE']
    when /iPhone|iPod|iPad/ then :layout_iphone
      puts "HERRO!!! IPHONE"
      # when "Android" then :layout_android
      @layout = :mobile_index
    else true # use default Sinatra layout
      puts 'YEAH, hello computor...'
      @layout = :index
    end
  end

end # hel

before do
  get_layout()
end

get '/' do
  erb @layout
end
