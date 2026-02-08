-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    type TEXT, -- e.g., 'Ambulance', 'Police', 'Fire', 'Vet'
    icon TEXT, -- e.g., 'Ambulance', 'Phone'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create helplines table
CREATE TABLE IF NOT EXISTS helplines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    number TEXT NOT NULL,
    available_hours TEXT, -- e.g., '24/7', '9 AM - 5 PM'
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT, -- e.g., 'General', 'Account', 'Orders'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed data for emergency_contacts
INSERT INTO emergency_contacts (name, phone, type, icon) VALUES
('Pet Ambulance', '108', 'Medical', 'Ambulance'),
('Animal Control', '101', 'Safety', 'Shield'),
('24/7 Vet Clinic', '555-0123', 'Medical', 'Stethoscope');

-- Seed data for helplines
INSERT INTO helplines (name, number, available_hours, icon) VALUES
('General Support', '1-800-PET-HELP', '24/7', 'Phone'),
('Adoption Enquiries', '1-800-ADOPT-ME', '9 AM - 6 PM', 'Heart');

-- Seed data for faqs
INSERT INTO faqs (question, answer, category) VALUES
('How do I track my order?', 'You can track your order by visiting the "Orders" section in your profile.', 'Orders'),
('What is the return policy?', 'We accept returns within 30 days of purchase for unused items.', 'Returns'),
('How can I contact support?', 'You can use the 24/7 Helpline or email us at support@petly.com.', 'General');
