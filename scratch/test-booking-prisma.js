const { createBooking, getBookings } = require('../app/actions/bookings');
const { prisma } = require('../lib/prisma');

async function test() {
  console.log('--- Testing Booking Creation via Prisma ---');
  
  const mockBookingPayload = {
    invoice_no: 'SNF-TEST-' + Math.floor(Math.random() * 10000),
    package_id: 'pkg-solo',
    package_name: 'Paket Solo (Test)',
    customer_name: 'Test Customer Prisma',
    customer_phone: '081234567890',
    session_date: '2026-06-01',
    session_time: '14:00',
    notes: 'Ini catatan uji coba RLS bypass',
    referral_code: null,
    discount_pct: 0,
    original_price: 150000,
    final_price: 150000,
    payment_method: 'transfer',
    status: 'pending'
  };

  const createResult = await createBooking(mockBookingPayload);
  console.log('Create result:', createResult);

  if (createResult.success) {
    console.log('✓ Booking created successfully!');
    
    console.log('--- Fetching all bookings via getBookings() ---');
    const fetchResult = await getBookings();
    console.log('Fetch success:', !fetchResult.error);
    console.log('Total bookings:', fetchResult.data.length);
    
    const found = fetchResult.data.find(b => b.invoice_no === mockBookingPayload.invoice_no);
    console.log('Found our test booking in the list?', !!found);
    if (found) {
      console.log('Test booking details:', found);
      
      // Clean up test booking to keep database clean
      await prisma.booking.delete({
        where: { id: found.id }
      });
      console.log('✓ Test booking cleaned up successfully.');
    }
  } else {
    console.error('✗ Failed to create booking:', createResult.error);
  }
}

test().catch(console.error);
