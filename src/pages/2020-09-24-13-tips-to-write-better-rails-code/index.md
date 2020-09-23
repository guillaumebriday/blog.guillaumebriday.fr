---
layout: post
title: "13 tips to write better Rails code"
category: Dev
lang: en
---

## 1. Install rubocop

Definitely, one of the most popular Gem on the Web. [Rubocop](https://github.com/rubocop-hq/rubocop) is a static code analyzer and formatter.

If you write Ruby code, you **must** use it! You don't have to fix every single warning or error but at least you must know that they are here.
You could also write your own rules or disable those you don't want.

You will learn so much things and good practices with Rubocop, **it's a must have**.

You should check its extensions too:
- [rubocop-rails](https://github.com/rubocop-hq/rubocop-rails) if you use [Rails](https://rubyonrails.org/).
- [rubocop-rspec](https://github.com/rubocop-hq/rubocop-rspec) if you use [Rspec](https://rspec.info/).
- [rubocop-performance](https://github.com/rubocop-hq/rubocop-performance) if you care about performance.
- [And so on](https://github.com/rubocop-hq)...

It's also very useful to remove deprecated methods and bad practises. It will help you to upgrade your application too.

## 2. Using hash instead of mutiple params

It's probably a [code smell](https://en.wikipedia.org/wiki/Code_smell) to defined too many parameters in your method signature.

**Even if** parameters have default value or are optional.

Why? For several reasons, let's take this example:
```ruby
def picture_url(picture, format = :small, full_url = false, caption = true)
  # Doing stuff
end
```

```ruby
<%= picture_url(@user.avatar, :thumb, true, false) %>
```

When you use this method it's very hard to know what parameters are given to the method.

> What the last two params, true and false, stand for here ? I need to open the method definition to know.

And moreover, if you need to change only one params, you have to redefined all others.

With hash, it's easier:

```ruby
def picture_url(picture, format: :small, full_url: false, caption: true)
```

```ruby
<%= picture_url(@user.avatar, format: :thumb, caption: false) %>
```

To resume:
```ruby
# Don't
def picture_url(picture, format = :small, full_url = false, caption = true)

# Do
def picture_url(picture, format: :small, full_url: false, caption: true)
```

## 3. Using scope for explicitness, not only DRY

[Scopes](https://guides.rubyonrails.org/active_record_querying.html#scopes) are generally used or presented to [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up your code.

> You should write scope for commonly-used queries in your code.

I think it's only partially true.

Scope are very useful for **readability** and to describe what we really want to do. It helps other developers to know what's going on in the query if they have lot of keywords.

For instance:
```ruby
# Don't
def index
  @posts = Post.where(published: true).where("published_at > ?", Time.current).order(:published_at)
end

# Do
def index
  @posts = Post.published.order(:published_at)
end

class Post < ApplicationRecord
  scope :published, -> { where(published: true).where("published_at > ?", Time.current) }
end
```

This scope might be used only once, but it improves the readability of the query in the controller and could be use in other scopes as well.

Another example, without the scope it could be hard to know why we would check the title's length:
```ruby
scope :with_long_title, ->(length = 20) { where("LENGTH(title) > ?", length) }
```

## 4. Extract your code

There are lots of patterns to help you to extract your code. Using scope is one of them.

Sometime we should extract more than we actually do.

You can use [helpers](https://api.rubyonrails.org/classes/ActionController/Helpers.html), [partials and layouts](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials), [gems](https://rubygems.org/), Decorators, Services, Form Object, Presenters and so on.

It will increase the readability and DRY up your code. It's also simpler to edit code in a dedicated `class` or `helper`.

Here, you don't have to understand what the params for `options_for_select` does, because it's self-documented in the helper's name.
```ruby
# Don't
= select_tag :state, options_for_select(User.states.keys.map { |state| [User.human_attribute_name("states.#{state}"), state] })

# Do
def user_states_as_options
  User.states.keys.map do |state|
    [User.human_attribute_name("states.#{state}"), state]
  end
end

= select_tag :state, options_for_select(user_states_as_options)
```

Extract in methods or variables when conditions are too complex.
```ruby
# Don't
if (user.present? && user.member?) && Date.current > post.published_at || post.comments.count > 0 && post.comments_opened?
  # Some stuff
end

# Do
def user_is_member?
  user.present? && user.member?
end

def post_published?
  Date.current > post.published_at
end

def post_has_comments?
  post.comments.count > 0 && post.comments_opened?
end

if user_is_member? && post_published? || post_has_comments?
  # Some stuff
end
```

## 5. Return early

Nested conditions **increase the cognitive load** you need to understand the code, avoid it with guard clauses and by returning earlier.

It will remove most of your else conditions too. You will read your code **like English**.

```ruby
# Don't
def some_method
  if user.present?
    if user.member?
      'Some'
    else
      'Stuff'
    end
  else
    'Here'
  end
end

# Do
def some_method
  return 'Here' if user.blank?
  return 'Some' if user.member?

  'Stuff'
end
```

## 6. Learn and use the power of your tools

Ruby and Rails **provide tons of methods** on Array, Hash, String and basically everything single Object.

Find and learn them to enjoy the full power of the ecosystem.

```ruby
# Don't
def some_methods
  users_name = []

  User.all.each do |user|
    users_name << user.name
  end

  users_name
end

# Do
def some_method
  User.all.collect { |user| user.name }
  User.all.collect(&:name) # Shorthand
end
```

```ruby
# Don't
items.select { |item| item.name == other_item.name }.first

# Do
items.find { |item| item.name == other_item.name }
```

## 7. Code for humans, not for computers

Humans are bad to compare things and to be sure that two line of code are almost the same.

These two lines only different from one scope. If you need to change something for one, **you need to change it for the other**.

```ruby
# Don't
def index
  @admins = User.admin.order(:position).enabled.limit(10).includes(:avatar)
  @members = User.order(:position).enabled.limit(10).includes(:avatar).members
end

# Do
def index
  users = User.order(:position).enabled.limit(10).includes(:avatar)

  @admins = users.admin
  @members = users.members
end
```

Self-documented variable assignation. This condition is only used to define the variable value and Ruby make it **readable like English**.
```ruby
# Don't
if country == :usa
  unit = '$'
elsif country == :fr
  unit = '€'
end

# Do
unit = case country
       when :usa then '$'
       when :fr then '€'
       end
```

Don't not use magic numbers. Use variables, constants or methods:
```ruby
# Don't
def price_with_taxes(price)
  price * (1.0 + 0.2)
end

# Do
TAX_RATE = 0.2

def price_with_taxes(price)
  price * (1.0 + TAX_RATE)
end
```

## 8. Define multiple has_many on the same associations

You can define different `has_many` associations on the same foreign_key.

```ruby
# Don't
class Team < ApplicationRecord
  has_many :members

  def managers
    members.where(manager: true)
  end
end

# Do
class Team < ApplicationRecord
  has_many :members
  has_many :managers, -> { where(manager: true) }, class_name: 'Member'
end
```

It feels more natural to describe your associations with [Active Record Associations](https://guides.rubyonrails.org/association_basics.html) instead of instance methods.

## 9. Don't use abbreviations

Abbreviations don't make you write your code faster!

I mean, write `user` or `usr`, `ctx` or `context` is the same. And don't forget that you have a muscle memory when you're writing common words.

```ruby
# Don't
def some_method
  accommodation_buildings.each do |ab|
    ab.apartments.each do |ap|
      "#{ap.name} in #{ab.name}"
    end
  end
end

# Do
def some_method
  accommodation_buildings.each do |accommodation_building|
    accommodation_building.apartments.each do |apartment|
      "#{apartment.name} in #{accommodation_building.name}"
    end
  end
end
```

You **don't have** to remember what `ap` and `ab` stand for, you just read it.

**Business rules are enough complex to not bloat your mind with abbreviations.**

This applies for variables, class, methods and basically everything.

There are few exceptions though. It's ok to use widely used abbreviations like `i` in for-loop or `id` instead of `identifier`.

## 10. Avoid useless conditions

Conditions are like temporary variables for your brain.
They have to be in your memory for a period of time in order to know what code is going to be executed.

Fortunately, most of them can't be avoided.

```ruby
# Don't
@post = Post.find(params[:id]) if params[:id].present?

# Do
@post = Post.find_by(id: params[:id])
```

```ruby
# Don't
def some_method(param)
  return 'Foo' if param.present? && param == :something

  'Bar'
end

# Do
def some_method(param)
  return 'Foo' if param == :something

  'Bar'
end
```

Using [delegate](https://apidock.com/rails/Module/delegate):
```ruby
# Don't
- if post.category.present?
  = post.category.name

# Do
class Post < ApplicationRecord
  belongs_to :category, optional: true
  delegate :name, to: :category, prefix: true, allow_nil: true
end

= post.category_name
```

```ruby
# Don't
if users.any?
  users.each do |user|
    # Some stuff
  end
end

# Do
users.each do |user|
  # Some stuff
end
```

```ruby
# Don't
if user.member?
  users.where(member: true)
else
  users.where(member: false)
end

# Do
users.where(member: user.member?)
```

## 11. Negated conditions and ternaries

Compute conditions in our brain **is not an easy task**. Don't make it harder with double negation.

It feels more natural to read `Is this user present and a member?` than `Is this user is not absent and not an admin?`, right?

Sometime, you will have to completely rewrite your code to understand what exactly is happening.

```ruby
# Don't
def some_method
  unless user.blank? || user.not_admin?
    # Some stuff
  else
    # Some other stuff
  end
end

# Do
def some_method
  if user.present? && user.member?
    # Some stuff
  else
    # Some other stuff
  end
end
```

I generally never use the keyboard `unless` nor I write methods with negation or at least I write the positive alternative:

```ruby
# Don't
def not_admin?
  # my condition
end

# Do
def not_admin?
  # my condition
end

def member?
  !not_admin?
end
```

Same for ternaries, it could be even worst with nested one's:
```ruby
# Don't
def some_method
  unless user.blank? ? (user.not_admin? ? 'Some' : 'Stuff') : 'Here'
end

# Do
def some_method
  return 'Here' if user.blank?
  return 'Some' if user.member?

  'Stuff'
end
```

Sometime you have to write ternaries, in inline blocks for example, then try to use positive conditions:

```ruby
# Don't
users.collect { |user| user.not_admin? ? 'Member' : 'Admin' }

# Do
users.collect { |user| user.member? ? 'Member' : 'Admin' }
```

Try to use the positive version of methods available to prevent double negations:
```ruby
# Don't
users.reject { |user| user.not_admin? }
users.reject(&:not_admin?) # shorthand version

# Do
users.select { |user| user.member? }
users.select(&:member?) # shorthand version
```

## 12. Extract in gem

Creating a gem is not that complicated. For instance, I need to create a lot of `link_to` with

`target: '_blank', rel: 'noopener noreferrer'` attributes on a daily basis.

Instead of writing these attributes multiple times a day, I created the gem [external link to](https://github.com/guillaumebriday/external_link_to) with these attributes by default around the default `link_to` helper:

```ruby
# Don't
= link_to 'Home', root_path, rel: 'noopener noreferrer', target: '_blank'

# Do
= external_link_to 'Home', root_path
```

## 13. Readability is better than cleverness

Remember, you're writing code with other developers (or/and your future yourself) to solve users' problems.

Don't write code to show off your skills or your intelligence. 

Our brain cycles **are more valuable** than our CPU cycles. Let the computer do the hard work.

You don't need to find a way to reduce your 15 lines of clear code into 3 that no one would ever understand.

Stupid code is easier to debug!

**Keep it simple, stupid.**
