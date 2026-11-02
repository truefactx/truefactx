# Stripe Integration TODO

## Values to Replace

All `sample_only` values (`mode`, `success_url`, `cancel_url`, `line_items`) are already fully configured with your dynamic store values (cart items, current prices, origins). No placeholder replacements are required!

## Configured Parameters

These parameters were configured via the Stripe Checkout Studio integration and are already set correctly.

**Files containing these parameters:**
- [src/app/api/checkout/route.ts](src/app/api/checkout/route.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | `hosted_page` |
| billing_address_collection | `auto` |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| allow_promotion_codes | `false` |
| submit_type | `auto` |
| integration_identifier | `hosted_web_0002` |
| origin_context | `web` |

## Setup and Next Steps

- **Environment Variables**: Make sure your `.env.local` contains your `STRIPE_SECRET_KEY` (already done).
- **Webhooks (Optional)**: If you need to fulfill orders programmatically, you can add an endpoint to listen for `checkout.session.completed` events.
- **Testing**: Test your integration thoroughly using a test mode API key and test credit card numbers provided by Stripe.
- **Resources**: For more details, consult [Stripe Docs](https://docs.stripe.com/mcp) and [Stripe Support](https://support.stripe.com).
