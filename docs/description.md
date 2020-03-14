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
Assets

	Documents

		personal identification information
		medical history
		family medical history
		medication history
		treatment history
		medical directives

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

