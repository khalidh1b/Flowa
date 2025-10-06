-- CreateEnum
CREATE TYPE "Currencies" AS ENUM ('USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 'TWD', 'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'MYR', 'RON', 'NGN', 'BDT', 'PKR', 'EGP', 'KWD', 'QAR', 'LKR', 'DZD', 'MAD', 'VND', 'UAH', 'KZT', 'BHD', 'OMR', 'JOD', 'IRR', 'IQD', 'XOF', 'XAF', 'GHS', 'TZS', 'KES', 'UGX', 'AFN', 'NPR', 'MMK', 'ETB', 'MZN', 'BWP', 'ZMW', 'AOA', 'XCD', 'BBD', 'BZD', 'BND', 'FJD', 'WST', 'PGK', 'MUR', 'SCR', 'MVR', 'LAK', 'KGS', 'MDL', 'MKD', 'ISK', 'BAM', 'ALL', 'RSD', 'GEL', 'TJS', 'UZS', 'MNT', 'SYP', 'SDG', 'LYD', 'YER', 'MWK', 'GNF', 'LSL', 'SZL', 'SSP', 'HTG', 'SLL', 'MGA', 'CUP', 'BSD', 'SRD', 'TTD', 'JMD', 'DOP', 'PEN', 'BOB', 'PYG', 'UYU', 'VES', 'XPF', 'XDR');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "currency" "Currencies" NOT NULL DEFAULT 'USD';
