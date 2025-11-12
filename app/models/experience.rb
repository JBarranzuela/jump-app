class Experience < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :country, presence: true, length: { minimum: 2, maximum: 50 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { minimum: 10, maximum: 5000 }
end
