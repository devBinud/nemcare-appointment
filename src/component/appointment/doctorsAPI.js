const doctorsAPI = {
    "Emergency and Trauma Unit": {
      "Dr. Sashibha Barman": ["9:00 AM - 9:30 AM", "10:00 AM - 10:30 AM", "11:00 AM - 11:30 AM"],
      "Dr. Sheikh Md Shahin": ["9:00 AM - 9:30 AM", "10:00 AM - 10:30 AM", "11:00 AM - 11:30 AM"],
      "Dr. Prayas Singhal": ["10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM", "12:00 PM - 12:30 PM"],
      "Dr. Mrinal Dev Choudhury ": ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"],
      "Dr. Satyaraj Choudhury": ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"],
      "Dr. Pranjal Majumdar": ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"],
    },
    "Cardiology & Cardiac ICU": {
      "Dr. Manoj Kr Agarwala": ["9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM"],
      "Dr. Dibya Kr Baruah": ["11:00 AM - 11:30 AM", "12:00 PM - 12:30 PM", "1:00 PM - 1:30 PM"],
      "Dr. Ghanashyam Basumatary": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Monowar Hussain": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Rajesh Das": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Farhin Iqbal": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Farooq B Ali": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Nihar Debarman Basumatary": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Pratik Medhi": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Aliasagar Ahmed": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
      "Dr. Avinashraj Ahmed": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"],
    },
    "Department of CTVS": {
      "Dr. Apurba Kr Sarma": ["12:00 PM - 12:30 PM", "1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM"],
      "Dr. Nilaksha Bhattacharjee": ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM"]
    },
    "Department of Orthopedics": {
      "Dr. Anil Kr Mahanta": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Pradip Kr Baruah": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Neurology": {
      "Dr. Monalisa Goswami Sarma": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Manshi Kashyap": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Neurosurgery": {
      "Dr. Anshuman Borah": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Ashim Kr. Boro": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Oncology": {
      "Dr. Umesh Das": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Onco-Surgery": {
      "Dr. Siddhartha Hazarika": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Jadunath Buragohain": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Hrishikesh Deka ": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Endocrinology": {
      "Dr. Bipul Choudhury": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Samiran Das": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Nephrology": {
      "Dr. Satyakam Kakoti": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Manjuri Sarma": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Himanab Jyoti Das": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Pulmonology": {
      "Dr. Avinash Das": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Sophie": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Paul": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Gastroenterology & Gastrosurgery": {
      "Dr. Biswajit Deori": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Amritangsu Borkakaty": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Suman Talukdar": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },

    "Department of Hematology": {
      "Dr. Jina Bhattarchrya ": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Damodar Das": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
    },
    "Department of Urology": {
      "Dr. Jyoti Prasad Morang": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Obs & Gynae": {
      "Dr. Nerupa Jodhani": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Bibha Rani Devi": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Chapala Patowary ": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Pediatrics": {
      "Dr. Rasna Dass Hazarika": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Mridupawan Saikia": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Sourabh Duwarah": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Diabetology": {
      "Dr. Kishore Kr. Barman": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Pranab Pathak": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Harshavardhan Kalita": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Surgery": {
      "Dr. Dilip Kr Deka": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Kajal Nayan Das": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Manoj Choudhury": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Utpal Baruah": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Hrishikesh Deka": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
    },
    "Department of Plastic Surgery": {
      "Dr. Kabita Kalita": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Dibyajyoti Bora": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
    },
    "Department of Dental Sciences": {
      "Dr. Nabanita Baruah": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Barsha Goswami": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Anupam Deka": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Manash Kalita": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Shemina S. Haque ": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Biswajit Dey": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Papori Borah ": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Alisha Kanodia ": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Sampanna Kalita": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Anusmita Deka": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
    },
    "Department of Oral & Maxillofacial Surgery": {
      "Dr. Ashutosh Vatsyayan ": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Debasish Borkotoky": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
    },
    "Department of Rheumatology": {
      "Dr. Ankit Patwary": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Radiology": {
      "Dr. Gauri Kanta Kalita": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Dibya Mohan Hazarika": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Aranya Ranjan Pathak": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Pathology & Microbiology": {
      "Dr. Bela Sethi": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Madhujya Barman ": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Nabanita Deka": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Meghna Gogoi Das": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Aubreen R. Khan": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
    },
    "Department of Opthalmology": {
      "Dr. Mihir Kr. Baruah": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Hiramoni Sarma": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Nilakshi Baruah": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of ENT": {
      "Dr. Anjali Baruah": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Produl Hazarika": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Nayanjyoti Sarma": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Trisha Deka": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Himajit Barman": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
    },
    "Department of Medicine": {
      "Dr. Arunima Goswami": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Amal Dev Goswami": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Promod Das": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Paresh Sarma": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Swaroop Kr Baruah": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Bikash Kr Das": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Mithu Teron": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
    "Department of Dermatology": {
      "Dr. Anita Baruah ": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Psychiatry": {
      "Sumi B. Choudhury": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Pain Clinic": {
      "Dr. Arun Deka": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Parijat Dutta Bharali": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
    },
    "24 X 7 Blood Bank": {
      "Dr. Mayuri Borgohain": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
    },
    "Department of Critical Care": {
      "Dr. Jnandip Baishya": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Rakesh Bordoloi": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Anjuma Borah ": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Raju Das": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Anup Dutta": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Sourabh Jyoti Gogoi": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Sandip Kalita": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Vishwadip Chakrabarti": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Gargee Dutta": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
    },
    "Department of Burn & Plastic Surgery": {
      "Dr. Bhupendra Prasad Sarma ": ["9:30 AM - 10:00 AM", "10:30 AM - 11:00 AM", "11:30 AM - 12:00 PM"],
      "Dr. Kabita Kalita": ["1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"],
      "Dr. Kabita S. Choudhury": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Satya Ranjan Gogoi": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"],
      "Dr. Subhendhu Biswal": ["4:00 PM - 4:30 PM", "5:00 PM - 5:30 PM", "6:00 PM - 6:30 PM"]
    },
  };
  
  export default doctorsAPI;
  