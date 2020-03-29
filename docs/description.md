level: user

Success Guarantee (Postconditions):

	Patient medical recordes are updated (saved)
	User's (patient) examination results are saved
	Payment authorization approvals are recorded
	Tax is correctly calculated
	Receipt is generated
	
Main success Secanrio (Basic flow):

	1 Bob walksup to the hospital counter and requests to get medical service
	2 counter staff asks bob which service (medical assistance) he would like to get
	3 Bob specifies the service he wants
	4 staff then requests bob to provide his details (credentials)
	5 Bob hands his credentials to the staff
	6 Staff inserts Bob's details and selects the medical service requested by Bob
	7 Bob then goes to specified medical room to get his medical examination. Once done Bob returns to the counter
	8 The HCS then generates the total amount due based on the service bob requested
	9 Staff asks bob to make payment
	10 Bob pays the total amount and is provided with a reciept of the medical service

Participants in the network:

	- police
	- finacial institutions
		banks
		insuarnce
	- hospitals who choose to join
	- government medical department
	- Some form of transpotation facilitation (transportaion org)
	- patients

********************************
chaincodes
	hospital_cycle
		hospitalInfoCreate()
		hospitalInfoQuery()
		hospitalInfoUpdate()
		hospitalInfoDelete()
		hospitalAllHistoryQuery()

		patientRecordsCreate()
		patientRecordsQuery()
		patientRecordsUpdate()
		patientRecordsDelete()
		patientAllHistoryQuery()

	hospital_payment
		institutionCreate()
		institutionQuery()
		institutionUpdate()
		institutionDelete()
		institutionListAll()

		claimCreate()
		claimQuery()
		claimUpdate()
		claimDelete()
		claimListAll()

	hospital_authorities
		police_incidentCreate()
		police_incidentQuery()
		police_incidentUpdate()
		police_incidentDelete()
		police_incidentListAll()

		gov_authorizationDocumentCreate()
		gov_authorizationDocumentQuery()
		gov_authorizationDocumentUpdate()
		gov_authorizationDocumentDelete()
		gov_authorizationDocumentListAll()

********************************
Channels in the network
	hospital <-to-> hospital
	hospital <-to-> finacial institution
	hospital <-to-> government (including police department)

********************************
Assets

	Documents

		personal identification information
		medical history
		family medical history
		medication history
		treatment history
		medical directives

Document asset structure
	patient_id (or asset_id since we want to create a record of a patient to be our asset)
	asset
		patient_info
			first name
			last name
			gender (male/female)
			date_of_birth (month/day/year)
			address
				street address
				city
				state/province
				postal / zip code
				country
			contact info
				contact number
				email
				emergency info
					first name
					last name
					contact number
					relationship
			other info
				Also include insurance information
				pharmacy name & phone number

		medicalrecords
			Chief complaint
			Family history
			Allergies
			Medication history
				current medications
				dosages
				frequency of administration
				reason for taking
				adherence
			Physical examination
		medicalresults
			laboratory test Results
			Diagnostic Test Results
		medicalnotes
			Problem List
			Clinical Notes
			Treatment Notes
		timestamp (date of creation or modification)
		hash

Asset attributes
	asset_id
	asset_owner (eg:-creator)
	documents[] (or a single document)
		doctype
			jpg
			png
			txt
			pdf
	raw_data[] (actual field details eg:- name, age etc...)
	asset_issuer (eg:- hospital_A issue an asset)



********************************

Components of a patient’s records include:

    Medical records
    Nursing records/progress notes
    Medication charts
    Laboratory orders and reports
    Vital signs observation charts
    Handover sheets and admission
    Discharge and transfer checklists/ letters
    Patient’s assessment forms, such as nutrition or pressure area care assessment.


*********************************
Types of Services
------------------
	Health services cover many different types of medical issues. Many people think of primary care, outpatient care, and emergency care when they need an illness managed or are generally not feeling well. However, there are more health services that are dedicated to certain illnesses or issues. These health services include:

		Mental health care
		Dental care
		Laboratory and diagnostic care
		Substance abuse treatment
		Preventative care
		Physical and occupational therapy
		Nutritional support
		Pharmaceutical care
		Transportation
		Prenatal care

<<<<<<< HEAD
=======

>>>>>>> dev
*********************************

New patient registration

	first name
	last name
	gender (male/female)
	date_of_birth (month/day/year)
	address
		street address
		city
		state/province
		postal / zip code
		country
	contact info
		contact number
		email
		emergency info
			first name
			last name
			contact number
			relationship
	other info
		taking medication currently (yes/no)
		description (if 'yes')

Hospital

	name
	address
		street address
		city
		state/province
		postal / zip code
		country
	contact info
		contact number
		email



**********************************************
Medical history
----------------
The medical history, or H&P, includes the following components

	patient demographis
		name
		date of birth
		phone number
		gender
		address
		marital status
		name of attending physician

		Also include insurance information
		pharmacy name & phone number

	Chief complaint (CC). 
		The chief complaint is the primary reason the patient is presenting for care. Often expressed using the patient’s own words, it includes the symptoms the patient is currently experiencing. At times the CC is not really a “complaint” at all; the patient may be presenting to the ­pharmacy to have a prescription filled or may be coming to the clinic for an annual physical exam

	Family history
		The family history includes descriptions of the age, status (dead or alive), and presence or absence of chronic medical conditions in the patient’s parents, siblings, and children.

	Allergies.
		a separate heading to denote any history of allergic reactions a patient has had to medications, foods, vaccines, stings, and contrast media, as well as what type of hypersen sitivity reaction occurs when a patient is exposed to the agent, including rash, hives, or naphylaxis.

	Medication history. 
		Information regarding the patient’s current medication list may be found in several areas of the inpatient chart, including a ­resident’s initial H&P, the medication reconciliation form, and nursing intake notes. Reviewing each of these areas may be necessary to gather a complete list of current medications (prescription, nonprescription, and complementary and alternative medicines), dosages, frequency of administration, duration of therapy, reason for taking, and adherence.

	Physical examination (PE). 
		The physical examination contains objective information obtained from the practitioner’s examination of the patient. As mentioned previously, subjective information is typically excluded from the PE, allowing for inclusion of information gathered by the practitioner upon observing and touching the patient.The PE is documented in a head to-toe format, permitting straightforward review of all organ systems.

Medical Test results

	laboratory test Results

		Initial laboratory results are documented following the initial H&P. Most patients will have a basic metabolic panel and complete blood count (CBC) in addition to other parameters specific to their diagnosis and medical conditions, including, but not limited to, cardiac enzymes, serum drug concentrations, international normalized ratio (INR), liver function tests, and cultures of blood or other body fluids. Calculated values, such as anion gap and creatinine clearance, are also documented in this section

		Additionally, practitioners’ H&Ps may include documentation of initial lab results. However, it is important to view the actual results for oneself, because it is easy for an error in transcription to occur

	Diagnostic Test Results

		Initial results of diagnostic testing are documented within the H&P as well. Such results may include electrocardiograms, echocardiograms, ultrasounds, computed ­tomography (CT) scans, magnetic resonance imaging (MRI) scans, x-rays, and so on. Because these tests require interpretation, often by a separate physician (e.g., ­radiologist, ­cardiologist), dictations of their results are often available on a computer system and/or may be printed for placement in the paper chart

Medical notes

	Problem List

		The problem list notes, in decreasing order of priority, the issues that require management in the individual patient. The number one need on the list is the working diagnosis that matches the signs and symptoms with which the patient has presented.


	Clinical Notes

		The inpatient paper chart often gets thick with the many types of clinical notes written by the numerous practitioners caring for the patient. The resident and attending physician will write daily progress notes that document an updated and abbreviated H&P, problem list, and plan.

	Treatment Notes

		Treatment notes are utilized most frequently in the inpatient setting. Treatment notes include medication orders, medication administration records (MARs), documentation of surgical procedures, and documentation of services such as radiation therapy, physical therapy, occupational therapy, respiratory therapy, and nutrition. All of these areas of the chart are important to review, because each provides details regarding the execution of the patient’s treatment plan.

