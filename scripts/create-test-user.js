const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        const hashedPassword = await bcrypt.hash('testpassword123', 12);
        
        const user = await prisma.user.create({
            data: {
                email: 'test@example.com',
                password: hashedPassword,
                name: 'Test User',
            },
        });

        console.log('Test user created successfully:', {
            email: 'test@example.com',
            password: 'testpassword123',
            name: 'Test User'
        });
    } catch (error) {
        if (error.code === 'P2002') {
            console.log('Test user already exists with email: test@example.com');
            console.log('You can use: email: test@example.com, password: testpassword123');
        } else {
            console.error('Error creating test user:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();