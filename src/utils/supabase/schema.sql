
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  state text,
  country text,
  phone_number text,
  updated_at timestamp with time zone,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for proposals
create table proposals (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) not null,
  title text not null,
  summary text not null,
  content text,
  problem_solution text, 
  tags text[],
  category text not null,
  status text check (status in ('Proposed', 'Under Review', 'Adopted', 'Approved', 'Rejected', 'Removed')) default 'Proposed',
  removal_reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for proposals
alter table proposals enable row level security;

create policy "Proposals are viewable by everyone." on proposals
  for select using (true);

create policy "Authenticated users can create proposals." on proposals
  for insert with check (auth.uid() = author_id);

-- Create a table for comments
create table comments (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for comments
alter table comments enable row level security;

create policy "Comments are viewable by everyone." on comments
  for select using (true);

create policy "Authenticated users can create comments." on comments
  for insert with check (auth.uid() = user_id);

-- Create a table for votes (upvotes)
create table votes (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (proposal_id, user_id)
);

-- Set up RLS for votes
alter table votes enable row level security;

create policy "Votes are viewable by everyone." on votes
  for select using (true);

create policy "Authenticated users can vote." on votes
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their own vote." on votes
  for delete using (auth.uid() = user_id);

-- Solutions Table
create table solutions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  problem_solved text,
  type text,
  sector text,
  location text,
  website text,
  founded_year int,
  impact_metrics text[],
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table solutions enable row level security;

create policy "Solutions are viewable by everyone." on solutions
  for select using (true);

-- News Table
create table news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  content text,
  category text,
  source text,
  published_at date,
  image_url text,
  read_time text,
  author text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table news enable row level security;

create policy "News is viewable by everyone." on news
  for select using (true);

-- Officials Table
create table officials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  position text,
  state text,
  party text,
  rating numeric,
  promises_kept int default 0,
  promises_broken int default 0,
  promises_pending int default 0,
  image_url text,
  description text,
  residence text,
  contact_email text,
  contact_phone text,
  contact_socials jsonb,
  contact_address text,
  achievements text[],
  manifesto jsonb,
  financials jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table officials enable row level security;

create policy "Officials are viewable by everyone." on officials
  for select using (true);

-- Function to handle new user creation
create or replace function public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, state, country, phone_number)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'phone_number'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile for new users
create trigger on_auth_user_created
  after insert on auth.users

-- News Items Table (Specialized Aggregator)
create table news_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now() not null,
  title text not null,
  snippet text not null check (char_length(snippet) <= 280),
  original_url text not null unique,
  publisher text not null,
  author text,
  category text not null check (category in ('All', 'Economic', 'Political', 'Geopolitical', 'Financial', 'Technology', 'Security', 'Religious', 'Sports', 'Entertainment')),
  is_published boolean default true not null
);

alter table news_items enable row level security;

-- Policy 1: Public Read (is_published = true)
create policy "Public can view published news." on news_items
  for select using (is_published = true);

-- Policy 2: Admin Write (Authenticated users)
create policy "Admins can manage news." on news_items
  for all to authenticated
  using (true)
  with check (true);

