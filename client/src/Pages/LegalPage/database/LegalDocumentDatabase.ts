import ILegalDocument from "./ILegalDocument";
import moment from "moment";

const LegalDocumentDatabase : Map<string, ILegalDocument> = new Map<string, ILegalDocument>();

LegalDocumentDatabase.set("privacy-policy", {
    id: "privacy-policy",
    lastUpdated: moment("June 26 2020").toDate(),
    documentName: "Privacy Policy",
    summary: `
Thank you for choosing to be part of our community at Adapt Solutions LLC ("**Company**", "**we**", "**us**", or "**our**"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at
<support@adaptsolutions.tech>.

When you visit our website <http://abs.adaptsolutions.tech> (the "**Website**"), and more generally, use any of our services (the "**Services**", which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.

This privacy notice applies to all information collected through our Services (which, as described above, includes our Website), as well as any related services, sales, marketing or events.

Some examples of our services are listed below

- Our Websites, _like <http://adaptsolutions.tech> (or any subdomains)_

- Anywhere we gather information from you and refer you to this Privacy Policy

**Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.**`,
    sections: [
        {
            title: "What Information Do We Collect?",
            text: `
#### Personal information you disclose to us

**_In Short:_** _We collect information that you provide to us._

We collect personal information that you voluntarily provide to us when you  register on the  Website,  express an interest in obtaining information about us or our products and Services, when you participate in activities on the  Website  (such as by posting messages in our online forums or entering competitions, contests or giveaways)  or otherwise when you contact us.

The personal information that we collect depends on the context of your interactions with us and the  Website, the choices you make and the products and features you use. The personal information we collect may include the following:

**Personal Information Provided by You.**  We collect  names;  email addresses;  usernames;  passwords;  debit/credit card numbers;  and other similar information.

**Payment Data.** We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: <https://stripe.com/privacy>

All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.

####  Information automatically collected

_**In Short:** Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our  Website._

We automatically collect certain information when you visit, use or navigate the  Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about who and when you use our  Website  and other technical information. This information is primarily needed to maintain the security and operation of our  Website, and for our internal analytics and reporting purposes.

Like many businesses, we also collect information through cookies and similar technologies.  You can find out more about this in our Cookie Notice:  <https://abs.adaptsolutions.tech/legal/cookie-policy>.

The information we collect includes:

-   _Log and Usage Data._  Log and usage data is service-related, diagnostic usage and performance information our servers automatically collect when you access or use our  Website  and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the  Website  (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps') and hardware settings).

-   _Device Data._ We collect device data such as information about your computer, phone, tablet or other device you use to access the Website. Depending on the device used, this device data may include information such as your IP address (or proxy server), device application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system configuration information.

-   _Location Data._  We collect information data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type of settings of the device you use to access the  Website. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Locations settings on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services.
`
        },
        {
            title: "How Do We Use Your Information?",
            text: `
_**In Short:** We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent._

We use personal information collected via our  Website  for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.

We use the information we collect or receive:

-   **To facilitate account creation and logon process.** If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.  

-   **To post testimonials.** We post testimonials on our  Website  that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the consent of the testimonial. If you wish to update, or delete your testimonial, please contact us at  <support@adaptsolutions.tech>  and be sure to include your name, testimonial location, and contact information.  

-   **Request feedback.** We may use your information to request feedback and to contact you about your use of our  Website.  

-   **To enable user-to-user communications.** We may use your information in order to enable user-to-user communications with each user's consent.  

-   **To manage user accounts**. We may use your information for the purposes of managing our account and keeping it in working order.

-   **To send administrative information to you.** We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.  

-   **To protect our Services.** We may use your information as part of our efforts to keep our  Website  safe and secure (for example, for fraud monitoring and prevention).  

-   **To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.**  

-   **To respond to legal requests and prevent harm.** If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.`
        },
        {
            title: "Will Your Information Be Shared With Anyone?",
            text: `**_In Short:_** _We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations._

We may process or share your data that we hold based on the following legal basis:

-   **Consent:**  We may process your data if you have given us specific consent to use your personal information in a specific purpose.  
      
    
-   **Legitimate Interests:**  We may process your data when it is reasonably necessary to achieve our legitimate business interests.  

-   **Performance of a Contract:** Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract. 
    
-   **Legal Obligations:**  We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).  
    
-   **Vital Interests:**  We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.

More specifically, we may need to process your data or share your personal information in the following situations:

-   **Business Transfers.** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`
        },
        {
            title: "Do We Use Cookies And Other Tracking Technologies?",
            text: `
**_In Short:_** _We may use cookies and other tracking technologies to collect and store your information._

We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice:  [https://abs.adaptsolutions.tech/cookie-policy](https://abs.adaptsolutions.tech/cookie-policy).`
        },
        {
            title: "How Long Do We Keep Your Information?",
            text: `
**_In Short:_** _We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice  unless otherwise required by law._

We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.

When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.

** COVID-19 Tracking Logs in Washington State **

Our Check-In feature maintains 30-Day logs containing a users, email or phone number and their IP address. This is compliant with Washington governor Jay Inslee's May 15th, 2020 memo mandating that restaurants maintain a voluntary, 30-Day customer log, which you can find here <https://www.governor.wa.gov/sites/default/files/COVID19CustomerLogMemo.pdf?utm_medium=email&utm_source=govdelivery>
`
        },
        {
            title: "How Do We Keep Your Information Safe?",
            text: `
**_In Short:_** _We aim to protect your personal information through a system of organizational and technical security measures._

We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our  Website  is at your own risk. You should only access the  Website  within a secure environment.`
        },
        {
            title: "Do We Collect Information From Minors?",
            text: `
**_In Short:_** _We do not knowingly collect data from or market to children under 18 years of age._

We do not knowingly solicit data from or market to children under 18 years of age. By using the  Website, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the  Website. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at  <support@adaptsolutions.tech>.`
        },
        {
            title: "What Are Your Privacy Rights?",
            text: 
`**_In Short:_** _You may review, change, or terminate your account at any time._

If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here:  [http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm](http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm).

If you are resident in Switzerland, the contact details for the data protection authorities are available here:  [https://www.edoeb.admin.ch/edoeb/en/home.html](https://www.edoeb.admin.ch/edoeb/en/home.html).

**Account Information**

If you would at any time like to review or change the information in your account or terminate your account, you can:

■ Log in to your account settings and update your user account.

Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.

**Cookies and similar technologies:** Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our  Website. To opt-out of interest-based advertising by advertisers on our  Website visit [http://www.aboutads.info/choices/](http://www.aboutads.info/choices/).  For further information, please see our Cookie Notice:  [https://abs.adaptsolutions.tech/cookie-policy](https://abs.adaptsolutions.tech/cookie-policy).

**Opting out of email marketing:** You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may:

■  Access your account settings and update your preferences.`
        },
        {
            title: "Controls For Do-Not-Track Features?",
            text: `Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.`
        },
        {
            title: "Do California Residents Have Specific Privacy Rights?",
            text: `
**_In Short:_** _Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information._

California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.

If you are under 18 years of age, reside in California, and have a registered account with  the Website, you have the right to request removal of unwanted data that you publicly post on the  Website. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the  Website, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).

**CCPA Privacy Notice**

The California Code of Regulations defines a "resident" as:

(1) every individual who is in the State of California for other than a temporary or transitory purpose and

(2) every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose

All other individuals are defined as "non-residents."

If this definition of "resident" applies to you, certain rights and obligations apply regarding your personal information.

**What categories of personal information do we collect?**

We have collected the following categories of personal information in the past twelve (12) months:

|Category		 |Examples	 | Collected|
|----------------|-----------|----------|
| A. Identifiers | Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address and account name | NO |
| B. Personal information categories listed in the California Customer Records statute | Name, contact information, education, employment, employment history and financial information | YES |
| C. Protected classification characteristics under California or federal law | Gender and date of birth | NO |
| D. Commercial information | Transaction information, purchase history, financial details and payment information | YES |
| E. Biometric information | Fingerprints and voiceprints | NO |
| F. Internet or other similar network activity | Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems and advertisements | NO |
| G. Geolocation data | Device location | NO |
| H. Audio, electronic, visual, thermal, olfactory, or similar information | Images and audio, video or call recordings created in connection with our business activities | YES |
| I. Professional or employment-related information | Business contact details in order to provide you our services at a business level, job title as well as work history and professional qualifications if you apply for a job with us | NO |
| J. Education Information | Student records and directory information | NO |
| K. Inferences drawn from other personal information | Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics | NO |

We may also collect other personal information outside of these categories in instances where you interact with us in-person, online, or by phone or mail in the context of:

-   Receiving help through our customer support channels  
    
-   Participation in customer surveys or contests; and  
    
-   Facilitation in the delivery of our Services and to respond to your inquiries

**How do we use and share your personal information?**

More information about our data collection and sharing practices can be found in this privacy notice and our Cookie Notice:  [https://abs.adaptsolutions.tech/cookie-policy](https://abs.adaptsolutions.tech/cookie-policy).

You may contact us  by email at <support@adaptsolutions.tech>, or by referring to the contact details at the bottom of this document.

If you are using an authorized agent to exercise your right to opt-out, we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.

**Will your information be shared with anyone else?**

We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.

We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal data.

Adapt Solutions LLC  has not disclosed or sold any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months.  Adapt Solutions LLC  will not sell personal information in the future belonging to website visitors, users and other consumers.

### Your rights with respect to your personal data

**Right to request deletion of the data - Request to delete**

You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation or any processing that may be required to protect against illegal activities.

**Right to be informed - Request to know**

Depending on the circumstances, you have a right to know:

-   whether we collect and use your personal information;
    
-   the categories of personal information that we collect;
    
-   the purposes for which the collected personal information is used;
    
-   whether we sell your personal information to third parties;
    
-   the categories of personal information that we sold or disclosed for a business purpose;
    
-   the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and
    
-   the business or commercial purpose for collecting or selling personal information.

In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.

**Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights**

We will not discriminate against you if you exercise your privacy rights.

**Verification process**

Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with the information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g. phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.

We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. If, however, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity, and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.

**Other privacy rights**

-   you may object to the processing of your personal data
    
-   you may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the data
    
-   you can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.
    
-   you may request to opt-out from future selling of your personal information to third parties. Upon receiving a request to opt-out, we will act upon the request as soon as feasibly possible, but no later than 15 days from the date of the request submission.

To exercise these rights, you can contact us  by email at  <support@adaptsolutions.tech>, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.`
        },
        {
            title: "Do We Make Updates To This Notice?",
            text: `
**_In Short:_** _Yes, we will update this notice as necessary to stay compliant with relevant laws._

We may update this privacy notice  from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice  frequently to be informed of how we are protecting your information.`
        },
        {
            title: "How Can You Contact Us About This Policy?",
            text: `
**12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?**

If you have questions or comments about this notice, you may  email us at  <support@adaptsolutions.tech>  or by post to:

> Adapt Solutions LLC

> 4565 Flying Goat Avenue NE #B100

> Bainbridge Island,  WA  98110

> United States

**HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?**

Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please  visit:  [http://abs.adaptsolutions.tech/settings](http://abs.adaptsolutions.tech/settings). We will respond to your request within 30 days.

This privacy policy was created using  [Termly’s Privacy Policy Generator](https://termly.io/products/privacy-policy-generator/?ftseo).`
        }
    ],
    goal: "At Adapt Solutions, we want you to understand how we handle your data. We also want you to know your rights and choices to your data." 
})

LegalDocumentDatabase.set("terms-and-conditions", {
    id: "terms-and-conditions",
    lastUpdated: moment("June 27 2020").toDate(),
    documentName: "Terms And Conditions Of Usage",
    sections: [
        {
            title: "Agreement To Terms",
            text: `
These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and  Adapt Solutions LLC  ("**Company**", “**we**”, “**us**”, or “**our**”), concerning your access to and use of the  [http://abs.adaptsolutions.tech](http://abs.adaptsolutions.tech/) website as well as any of out other websites and media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.

Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.

The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.

The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).

The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Site.`
        },
        {
            title: "Intellectual Property Rights",
            text: `
Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.

Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.`
        },
        {
            title: "User Representations",
            text: `
By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.

If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).`
        },
        {
            title: "User Registrations",
            text: `
You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.`
        },
        {
            title: "Prohibited Activities",
            text: `
You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.

As a user of the Site, you agree not to:

1. Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.

2. Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.

3. Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.

4. Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.

5. Use any information obtained from the Site in order to harass, abuse, or harm another person.

6. Make improper use of our support services or submit false reports of abuse or misconduct.

7. Use the Site in a manner inconsistent with any applicable laws or regulations.

8. Use the Site to advertise or offer to sell goods and services.

9. Engage in unauthorized framing of or linking to the Site.

10. Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.

11. Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.

12. Delete the copyright or other proprietary rights notice from any Content.

13. Attempt to impersonate another user or person or use the username of another user.

14. Sell or otherwise transfer your profile.

15. Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).

16. Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.

17. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.

18. Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.

19. Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.

20. Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.

21. Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.

22. Use a buying agent or purchasing agent to make purchases on the Site.

23. Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.

24. Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.`
        },
        {
            title: "User Generated Contributions",
            text: `
The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Site. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:

1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.  
2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.  
3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.  
4. Your Contributions are not false, inaccurate, or misleading.  
5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.  
6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).  
7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.  
8. Your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.  
9. Your Contributions do not violate any applicable law, regulation, or rule.  
10. Your Contributions do not violate the privacy or publicity rights of any third party.  
11. Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.  
12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors;  
13. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.  
14. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.

Any use of the Site in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site.`
        },
        {
            title: "Contribution License",
            text: `
By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.

This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.

We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.

We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Site; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.`
        },
        {
            title: "Submissions",
            text: `You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.`
        },
        {
            title: "Third-Party Website Content",
            text: `
The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.`
        },
        {
            title: "Site Management",
            text: `
We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.`
        },
        {
            title: "Privacy Policy",
            text: `
We care about data privacy and security. Please review our Privacy Policy: **<http://abs.adaptsolutions.tech/legal/privacy-policy>**. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Please be advised the Site is hosted in  the  United States. If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in  the  United States, then through your continued use of the Site, you are transferring your data to  the  United States, and you agree to have your data transferred to and processed in  the  United States.`
        },
        {
            title: "Copyright Infringements",
            text: `
We respect the intellectual property rights of others. If you believe that any material available on or through the Site infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a “Notification”). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Site infringes your copyright, you should consider first contacting an attorney.`
        },
        {
            title: "Term And Termination",
            text: `
These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE  YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.

If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.`
        },
        {
            title: "Modifications and Interuptions",
            text: `
We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.

We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.`
        },
        {
            title: "Governing Law",
            text: `
These Terms of Use and your use of the Site are governed by and construed in accordance with the laws of  the State of  Washington  applicable to agreements made and to be entirely performed within the State of  Washington, without regard to its conflict of law principles.`
        },
        {
            title: "Dispute Resolution",
            text: `
Any legal action of whatever nature brought by either you or us (collectively, the “Parties” and individually, a “Party”) shall be commenced or prosecuted in the  state and federal courts  located in Kitsap, Washington, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such  state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms of Use. In no event shall any claim, action, or proceeding brought by either Party related in any way to the Site be commenced more than  one (1)  years after the cause of action arose.`
        },
        {
            title: "Corrections",
            text: `
There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.`
        },
        {
            title: "Disclaimer",
            text: `
THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.`
        },
        {
            title: "Limitations Of Liability",
            text: `
IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO  THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE  SIX (6)  MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.`
        },
        {
            title: "Indemnification",
            text: `
You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of:  (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.`
        },
        {
            title: "User Data",
            text: `
We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`
        },
        {
            title: "Electronic Communications, Transactions, And Signatures",
            text: `
Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.`
        },
        {
            title: "California Users And Residents",
            text: `
If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.`
        },
        {
            title: "Miscellaneous",
            text: `
These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.`
        },
        {
            title: "Contact Us",
            text: `
In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:

**Adapt Solutions LLC**

**4565 Flying Goat Avenue NE #B100**

**Bainbridge Island**,  **WA**  **98110**

**United States**

**Phone:** **4255035202**

**<support@adaptsolutions.tech>**

These terms of use were created using [Termly’s Terms and Conditions Generator](https://termly.io/products/terms-and-conditions-generator/?ftseo).`
        }
    ]
});

export default LegalDocumentDatabase