class Lesson < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  has_many :wordinfos, dependent: :destroy
  before_validation { self.title = 'Untitled' if title.blank? }
  accepts_nested_attributes_for :wordinfos
  validates :title, length: { maximum: 255 }

  def as_json(options = {})
    super(options.merge(
      include:
        { wordinfos: {
          include: [
            { roots: { only: [:word] } },
            { forms: { only: [:word, :part_of_speech] } },
            { synonyms: { only: [:word] } },
            { antonyms: { only: [:word] } },
            { sentences: { only: [:context_sentence] } }
          ],
          except: [:id, :user_id, :lesson_id, :created_at, :updated_at]
        } },
      except: [:owner_id, :created_at, :updated_at]
    ))
  end
end
