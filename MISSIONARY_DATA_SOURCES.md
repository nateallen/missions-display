# Missionary Data Sources

This document contains reference links to FBMI (Faith Baptist Mission International) missionary profile pages used to populate missionary information in this application.

## FBMI Profile URLs

All missionaries listed below are with Faith Baptist Mission International (FBMI). The URLs include portfolio category filters for consistent data retrieval.

### 1. Israel & Tonya Alvarez - Belize
- **FBMI Profile**: https://fbmi.org/missionary/alvarez?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Evangelism
- **Location**: Belize City, Belize

### 2. Oral & Alicia Anderson - Jamaica
- **FBMI Profile**: https://fbmi.org/missionary/anderson?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Gospel Preaching
- **Location**: Kingston, Jamaica

### 3. Caleb & Abby Amoros - Dominican Republic
- **FBMI Profile**: https://fbmi.org/missionary/calebamoros?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Evangelism & Missionary Training
- **Location**: Santo Domingo, Dominican Republic

### 4. Tommy & Emily Ashcraft - Mexico
- **FBMI Profile**: https://fbmi.org/missionary/ashcraft?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Gospel Preaching
- **Location**: Santiago, Mexico

### 5. Matt & Katie Belle Bosje - Thailand
- **FBMI Profile**: https://fbmi.org/missionary/bosje?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Community Outreach
- **Location**: Hua Hin, Thailand

### 6. Randy & Kelly DeMoville - Philippines
- **FBMI Profile**: https://fbmi.org/missionary/demoville?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Soul-Winning
- **Location**: Dumaguete City, Philippines

### 7. Zach & Karin Foust - Peru
- **FBMI Profile**: https://fbmi.org/missionary/foust?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Pastor Training
- **Location**: Lima, Peru

### 8. Brian & Liesl George - Argentina
- **FBMI Profile**: https://fbmi.org/missionary/george?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Church Planting & Soul-Winning
- **Location**: San Miguel de Tucumán, Argentina

### 9. Daniel & Megan Gonzalez - El Salvador
- **FBMI Profile**: https://fbmi.org/missionary/gonzalezd?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Youth Ministry & Community Outreach
- **Location**: San Salvador, El Salvador

### 10. Dr. Mark & Sabrina Holmes - Nigeria
- **FBMI Profile**: https://fbmi.org/missionary/holmes?portfolioCats=1292%2C627%2C635%2C626
- **Ministry**: Seminary & Church Planting
- **Location**: Abuja, Nigeria

## Portfolio Category Parameters

The `portfolioCats` query parameter includes the following categories:
- `1292` - (Category purpose to be documented)
- `627` - (Category purpose to be documented)
- `635` - (Category purpose to be documented)
- `626` - (Category purpose to be documented)

## Data Usage

Missionary data in this application is stored in:
- **File**: `/src/data/mock/missionaries.ts`
- **Photos**: `/public/images/missionaries/`
- **Country Images**: `/public/images/countries/`

## Updating Missionary Information

When updating missionary information:
1. Visit the FBMI profile URL for the specific missionary
2. Review the latest information on their profile page
3. Update the corresponding entry in `/src/data/mock/missionaries.ts`
4. Ensure profile photos are updated in `/public/images/missionaries/`
5. Update the `lastUpdated` field in the missionary's metadata

## Notes

- All missionaries are currently serving with FBMI
- Profile photos and data should be periodically refreshed from FBMI sources
- Newsletter data is stored separately in `/src/data/mock/newsletters.ts`

---

*Last Updated: 2026-02-01*
