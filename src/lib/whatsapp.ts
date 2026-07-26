export interface WhatsAppBookingParams {
  bookingId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  notes?: string;
}

export function getWhatsAppBookingUrl(params: WhatsAppBookingParams, targetPhone?: string): string {
  const defaultPhone = "9779851055520";
  const rawNumber = targetPhone || defaultPhone;
  const phoneNumber = rawNumber.replace(/[^0-9]/g, "") || defaultPhone;

  const message = `🏔️ *ANNAPURNA BASE CAMP GUESTHOUSE BOOKING*

*Booking Ref ID:* ${params.bookingId}
*Suite Reserved:* ${params.roomName}

👤 *Guest Information:*
- Name: ${params.guestName}
- Email: ${params.guestEmail}
- Phone: ${params.guestPhone}

🗓️ *Stay Details:*
- Check-In: ${params.checkIn}
- Check-Out: ${params.checkOut}
- Trekkers: ${params.guestsCount} Person(s)
${params.couponCode ? `- Promo Coupon: ${params.couponCode}\n` : ""}${params.discountAmount ? `- Discount: -$${params.discountAmount} USD\n` : ""}
💰 *Total Invoice Amount:* $${params.totalAmount} USD

Please confirm my reservation and provide expedition preparation details. Thank you!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
