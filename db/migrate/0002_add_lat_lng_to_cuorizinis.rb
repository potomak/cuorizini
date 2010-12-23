class AddLatLngToCuorizinis < ActiveRecord::Migration
  def self.up
    add_column :cuorizinis, :lat, :float
    add_column :cuorizinis, :lng, :float
  end

  def self.down
    remove_column :cuorizinis, :lat
    remove_column :cuorizinis, :lng
  end
end