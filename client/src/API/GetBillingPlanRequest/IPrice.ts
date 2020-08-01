export default interface IPrice {
    id: string,
    object: string,
    active: boolean,
    aggregate_usage: string,
    billing_scheme: string,
    created: number,
    currency: string,
    interval: string,
    interval_count: number,
    livemode: boolean,
    metadata: {
        Tier: string
    },
    nickname: string | null,
    product: string,
    tiers: {
        flat_amount: number,
        flat_amount_decimal: string,
        unit_amount: number,
        unit_amount_decimal: string,
        up_to: string
    }[],
    tier_mode: string,
    transform_usage: string | null,
    trial_period_days: string | null,
    usage_type: string
}