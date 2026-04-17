/**
 * site.ts — Global company/brand data
 * Edit this file to update contact details, social links, and brand info site-wide.
 */

export const SITE = {
    name: "Ayanco Trade Corporation",
    shortName: "Ayanco",
    tagline: "Premier Global Trading Corporation",
    description:
        "Bridging high-growth markets with premium industrial and agricultural supply chains — verified, compliant, and delivered.",
    foundedYear: 2012,

    contact: {
        email: "corporate@ayancotrade.com",
        infoEmail: "info@ayancotrade.com",
        phone: "+880 1711-000000",
        phoneRaw: "+8801711000000",
        whatsapp: "https://wa.me/8801711000000",
        address: "Banani Model Town, Dhaka-1213, Bangladesh",
        officeHours: "Saturday – Thursday, 9:00 AM – 6:00 PM (BST)",
        responseTime: "< 24 Hours",
    },

    /**
     * Branch offices — edit addresses, phones, and emails here.
     * The first entry is the Corporate HQ (isHQ: true).
     */
    offices: [
        {
            label: "Corporate HQ",
            city: "Dhaka",
            address: "Banani Model Town, Dhaka-1213",
            phone: "+880 1711-000000",
            email: "corporate@ayancotrade.com",
            mapUrl: "https://maps.google.com/?q=Banani,Dhaka",
            isHQ: true,
        },
        {
            label: "Port Office",
            city: "Chittagong",
            address: "Agrabad C/A, Chattogram-4100",
            phone: "+880 1711-000001",
            email: "ctg@ayancotrade.com",
            mapUrl: "https://maps.google.com/?q=Agrabad,Chattogram",
            isHQ: false,
        },
        {
            label: "Northern Branch",
            city: "Sylhet",
            address: "Zindabazar, Sylhet-3100",
            phone: "+880 1711-000002",
            email: "sylhet@ayancotrade.com",
            mapUrl: "https://maps.google.com/?q=Zindabazar,Sylhet",
            isHQ: false,
        },
        {
            label: "Southern Branch",
            city: "Khulna",
            address: "KDA Avenue, Khulna-9000",
            phone: "+880 1711-000003",
            email: "khulna@ayancotrade.com",
            mapUrl: "https://maps.google.com/?q=KDA+Avenue,Khulna",
            isHQ: false,
        },
        {
            label: "Industrial Branch",
            city: "Narayanganj",
            address: "B.B. Road, Narayanganj-1400",
            phone: "+880 1711-000004",
            email: "nganj@ayancotrade.com",
            mapUrl: "https://maps.google.com/?q=BB+Road,Narayanganj",
            isHQ: false,
        },
    ],

    social: {
        linkedin: "https://linkedin.com/company/ayanco",
        website: "https://ayancotrade.com",
    },

    certifications: [
        "ISO 9001:2015 Certified",
        "Bangladesh Trade License",
        "VAT & TIN Registered",
        "RJSC Registered",
    ],
} as const;
