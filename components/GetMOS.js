import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Vibration,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Deadlift from './events/Deadlift';
import PowerThrow from './events/PowerThrow';
import ReleasePushups from './events/ReleasePushups';
import SprintDragCarry from './events/SprintDragCarry';
import LegTuck from './events/LegTuck';
import Run from './events/Run';
import Score from './Score';
import Footer from './Footer';
import Header from './Header';
const DURATION = 1000;

export default class GetMOS extends Component {
  constructor() {
    super();

    this.state = { isLoading: true };

    this.state = {
      dlScoreInput: '',
      dlScore: '0',
      ptScoreInput: '',
      ptScore: '0',
      puScoreInput: '',
      puScore: '0',
      sdcScoreInput: '',
      sdcScore: '0',
      ltScoreInput: '',
      ltScore: '0',
      runScoreInput: '',
      runScore: '0',
      totalScore: '',
      goNoGo: '',
      mosInput: '',
      mosOutput: '',
      mosLevel: '',
      mosDesc: {
        '11A': '1Infantry',
        '12A': '1Engineer',
        '13A': '1Field Artillery, General',
        '14A': '2Air Defense Artillery Officer',
        '15A': '1Aviation, General',
        '15B': '1Aviation Combined Arms Operations',
        '15C': '1Aviation All-Source Intelligence',
        '15D': '1Aviation Maintenance Officer',
        '17A': '3Cyber warfare',
        '17B': '3Cyber Electromagnetic Operations Officer',
        '18A': '1Special Forces',
        '19A': '1Armor',
        '25A': '2Signal, General',
        '25G': '2Network Integration',
        '25Z': '3Network Integration',
        '27A': '3Judge Advocate General',
        '27B': '3Military Judge',
        '31A': '2Military Police',
        '35D': '3All Source Intelligence',
        '35E': '3Counter Intelligence (CI)',
        '35F': '3Human Intelligence (HUMINT)',
        '36A': '3Financial Manager',
        '37A': '3Psychological Operations',
        '37X': '3Psychological Operations, Designated',
        '38A': '3Civil Affairs (AA & USAR)',
        '38G': '3Military Government(USAR Only)',
        '38X': '3Civil Affairs, Designated',
        '42B': '2Human Resources Officer',
        '42C': '3Army Music',
        '42H': '2Senior Human Resources Officer',
        '56A': '3Command & Unit Chaplain',
        '56D': '3Clinical Pastoral Educator',
        '56X': '3Chaplain Candidate',
        '60A': '3Operational Medicine',
        '60B': '3Nuclear Medicine Officer',
        '60C': '3Preventive Medicine Officer',
        '60D': '3Occupational Medicine Officer',
        '60F': '3Pulmonary Disease/Critical Care Officer',
        '60G': '3Gastroenterologist',
        '60H': '3Cardiologist',
        '60J': '3Obstetrician & Gynecologist',
        '60K': '3Urologist',
        '60L': '3Dermatologist',
        '60M': '3Allergist, Clinical Immunologist',
        '60N': '3Anesthesiologist',
        '60P': '3Pediatrician',
        '60Q': '3Pediatric Sub-Specialist',
        '60R': '3Child Neurologist',
        '60S': '3Ophthalmologist',
        '60T': '3Otolaryngologist',
        '60U': '3Child Psychiatrist',
        '60V': '3Neurologist',
        '60W': '3Psychiatrist',
        '61A': '3Nephrologist',
        '61B': '3Medical Oncologist/Hematologist',
        '61C': '3Endocrinologist',
        '61D': '3Rheumatologist',
        '61E': '3Clinical Pharmacologist',
        '61F': '3Internist',
        '61G': '3Infectious Disease Officer',
        '61H': '3Family Medicine',
        '61J': '3General Surgeon',
        '61K': '3Thoracic Surgeon',
        '61L': '3Plastic Surgeon',
        '61M': '3Orthopedic Surgeon',
        '61N': '3Flight Surgeon',
        '61P': '3Physiatrist',
        '61Q': '3Radiation Oncologist',
        '61R': '3Diagnostic Radiologist',
        '61U': '3Pathologist',
        '61W': '3Peripheral Vascular Surgeon',
        '61Z': '3Neurosurgeon',
        '62A': '3Emergency Physician',
        '62B': '3Field Surgeon',
        '63A': '3General Dentist',
        '63B': '3Comprehensive Dentist',
        '63D': '3Periodontist',
        '63E': '3Endodontist',
        '63F': '3Prosthodonist',
        '63H': '3Public Health Dentist',
        '63K': '3Pediatric Dentist',
        '63M': '3Orthodontist',
        '63N': '3Oral & Maxillofacial Surgeon',
        '63P': '3Oral Pathologist',
        '63R': '3Executive Dentist',
        '64A': '3Field Veterinary Service',
        '64B': '3Veterinary Preventive Medicine',
        '64C': '3Veterinary Laboratory Animal Medicine',
        '64D': '3Veterinary Pathology',
        '64E': '3Veterinary Biomedical Scientist',
        '64F': '3Veterinary Clinical Medicine',
        '64Z': '3Senior Veterinarian (Immaterial)',
        '65A': '3Occupational Therapy',
        '65B': '3Physical Therapy',
        '65C': '3Dietitian',
        '65D': '3Physician Assistant',
        '65X': '3Specialist Allied Operations',
        '66B': '3Army Public Health Nurse',
        '66C': '3Psychiatric/Behavioral Health Nurse',
        '66E': '3Perioperative Nurse',
        '66F': '3Nurse Anesthetist',
        '66G': '3Obstetrics & Gynecology',
        '66H': '3Medical-Surgical Nurse',
        '66N': '3Generalist Nurse',
        '66P': '3Family Nurse Practitioner',
        '66R': '3Psychiatric/Behavioral Health Nurse Practitioner',
        '66S': '3Critical Care Nursing',
        '66T': '3Emergency Nursing',
        '66W': '3Certified Nurse Midwife',
        '67A': '3Health Services',
        '67B': '3Laboratory Sciences',
        '67C': '3Preventive Medicine Sciences',
        '67D': '3Behavioral Sciences',
        '67E': '3Pharmacy',
        '67F': '3Optometry',
        '67G': '3Podiatry',
        '67J': '3Aeromedical Evacuation',
        '74A': '3Chemical, Biological, Radiological & Nuclear (CBRN)',
        '88A': '1Transportation, General',
        '89E': '1Explosive Ordnance Disposal',
        '90A': '3Logistics',
        '91A': '3Maintenance & Munitions Materiel Officer',
        '92A': '1Quartermaster, General',
        FA26: '3Information Network Engineering',
        FA29: '3Electronic Warfare',
        FA30: '3Information Operations',
        FA34: '3Strategic Intelligence',
        FA40: '3Space Operations',
        FA46: '3Public Affairs',
        FA47: '3Academy Professor',
        FA48: '3Foreign Area Officer',
        FA49: '3Operations Research/Systems Analysis',
        FA50: '3Force Management',
        FA51: '3Army Acquisition Corps',
        FA57: '3Simulation Operations',
        FA59: '3Strategic Plans and Policy',
        '120A': '3Construction Engineering Technician',
        '125D': '3Geospatial Engineering Technician',
        '131A': '3Field Artillery Targeting Technician',
        '140A': '3Command & Control Systems Integrator',
        '140E': '3Air & Missile Defense(AMD) Systems Tactician/Technician',
        '140X': '3Air Defense Artillery (ADA) Immaterial',
        '150A': '3Air Traffic & Air Space Management Technician',
        '150U': '3Unmanned Aircraft Systems Operations Technician',
        '151A': '3Aviation Maintenance Technician(Nonrated)',
        '152B': '1OH-58A/C Scout Pilot(RC)',
        '152C': '1OH-6 Pilot',
        '152D': '1OH-58D Pilot',
        '152E': '1AH-64E Pilot',
        '152F': '1AH-64A Attack Pilot',
        '152H': '1AH-64D Attack Pilot',
        '153A': '1Rotary Wing Aviator (Aircraft Nonspecific)',
        '153B': '3UH-1 Pilot (RC)',
        '153D': '1UH-60 Pilot',
        '153E': '1MH-60 Pilot',
        '153L': '1UH-72A Pilot',
        '153M': '1UH-60M Pilot',
        '154C': '1CH-47D Pilot',
        '154E': '1MH-47 Pilot',
        '154F': '1CH-47F Pilot',
        '155A': '3Fixed Wing Aviator (Aircraft Nonspecific)',
        '155E': '3C-12 Pilot',
        '155F': '3Jet Aircraft Pilot',
        '155G': '30-5A/EO-5B/RC-7 Pilot',
        '170A': '3Cyber Operations Technician',
        '170B': '3Electronic Warfare Technician (Effective 201810)',
        '180A': '3Special Forces Warrant Officer',
        '255A': '3Information Services Technician',
        '255N': '3Network Management Technician',
        '255S': '3Information Protection Technician',
        '255Z': '3Senior Network Operations Technician',
        '270A': '3Legal Administrator',
        '290A': '3Electronic Warfare Technician (Rescind 201810)',
        '311A': '3Cid Special Agent',
        '350F': '3All Source Intelligence Technician',
        '350G': '3Geospatial Intelligence Imagery Technician',
        '351L': '3Counterintelligence Technician',
        '351M': '3Human Intelligence Collection Technician',
        '351Y': '3Area Intelligence Technician',
        '351Z': '3Attaché Technician',
        '352N': '3Signals Intelligence Analysis Technician',
        '352S': '3Signals Collection Technician',
        '353T': '3Intelligence Systems Integration & Maintenance Technician',
        '420A': '2Human Resources Technician',
        '420C': '3Bandmaster',
        '640A': '3Food Safety Officer',
        '670A': '3Health Services Maintenance Technician',
        '740A':
          '3Chemical, Biological, Radiological & Nuclear (CBRN) Warrant Officer',
        '880A': '3Marine Deck Officer',
        '881A': '3Marine Engineering Officer',
        '882A': '3Mobility Officer',
        '890A': '3Ammunition Technician',
        '913A': '3Armament System Maintenance Warrant Officer',
        '914A': '3Allied Trades Warrant Officer',
        '915A': '3Automotive Maintenance Warrant Officer',
        '915E':
          '3Senior Automotive Maintenance Warrant Officer/Senior Ordnance Logistics Warrant',
        '919A': '3Engineer Equipment Maintenance Warrant Officer',
        '920A': '3Property Accounting Technician',
        '920B': '3Supply System Technician',
        '921A': '3Airdrop Systems Technician',
        '922A': '3Food Service Technician',
        '923A': '3Petroleum Technician',
        '948B': '3Electronic Systems Maintenance Warrant Officer',
        '948D': '3Electronic Missile Systems Maintenance Warrant Officer',
        '948E': '3Senior Electronics Maintenance Warrant Officer',
        '00Z': '3Sergeant Major Nominative',
        '09B': '3Trainee Unassigned',
        '09C': '3Trainee Language',
        '09D': '3College Trainee',
        '09E': '3Trainee Language, Fort Allen PR',
        '09J': '3GED Completion Program',
        '09L': '3Interpreter/Translator',
        '09M': '3March 2 Success',
        '09N': '3Nurse Corps Candidate',
        '09Q':
          '3Army Legal Immigrant Healthcare Professional Officer Candidate',
        '09R': '3Simultaneous Member Program',
        '09S': '3Commissioned Officer Candidate',
        '09T': '3College Student Army National Guard Officer Program',
        '09U': '3Unqualified In Authorized Army MOS',
        '09W': '3Warrant Officer Candidate',
        '11B': '1Infantryman',
        '11C': '1Indirect Fire Infantryman',
        '11X': '1Infantry Recruit',
        '11Z': '3Infantry Senior Sergeant',
        '12A': '3Engineer Senior Sergeant',
        '12B': '1Combat Engineer',
        '12C': '1Bridge Crewmember',
        '12D': '1Diver',
        '12G': '2Quarrying Specialist(RC)',
        '12H': '3Construction Engineering Supervisor',
        '12K': '3Plumber',
        '12M': '2Firefighter',
        '12N': '3Horizontal Construction Engineer',
        '12P': '1Prime Power Production Specialist',
        '12Q': '3Power Line Distribution Specialist(RC)',
        '12R': '3Interior Electrician',
        '12T': '3Technical Engineer',
        '12V': '2Concrete & Asphalt Equipment Operator (RC)',
        '12W': '3Carpentry & Masonry Specialist',
        '12X': '3General Engineering Supervisor',
        '12Y': '3Geospatial Engineer',
        '12Z': '3Combat Engineering Senior Sergeant',
        '13B': '1Cannon Crewmember',
        '13D': '3Field Artillery Automated Tactical Data System Specialist',
        '13F': '1Joint Fire Support Specialist',
        '13J': '3Fire Control Specialist',
        '13M':
          '3Multiple Launch Rocket System(MLRS)/High Mobility Artillery Rocket System(HIMARS)',
        '13P':
          '3Multiple Launch Rocket System(MLRS) Operational Fire Direction Specialist',
        '13R': '3Field Artillery Firefinder Radar Operator',
        '13T': '3Field Artillery Surveyor/Meteorological Crewmember',
        '13X': '3Field Artillery Computer Systems Specialist',
        '13Z': '3Field Artillery Senior Sergeant',
        '14E': '3Patriot Fire Control Enhanced Operator/Maintainer',
        '14G': '3Air Defense Battle Management System Operator',
        '14H': '3Air Defense Enhanced Early Warning Operator',
        '14P': '2Air & Missile Defense (AMD) Crewmember',
        '14S': '2Avenger Crewmember',
        '14T': '3Patriot Launching Station Enhanced Operator/Maintainer',
        '14X': '3Space and Missile Defense Operations',
        '14Z': '3Air Defense Artillery Senior Sergeant',
        '15B': '2Aircraft Powerplant Repairer',
        '15D': '2Aircraft Powertrain Repairer',
        '15E': '2Unmanned Aircraft Systems Repairer',
        '15F': '2Aircraft Electrician',
        '15G': '3Aircraft Structural Repairer',
        '15H': '3Aircraft Pneudraulics Repairer',
        '15J': '2OH-58D Armament/Electrical/Avionics Systems Repairer',
        '15K': '3Aircraft Components Repair Supervisor',
        '15N': '2Avionic Mechanic',
        '15P': '3Aviation Operations Specialist',
        '15Q': '3Air Traffic Control Operator',
        '15R': '2AH-64 Attack Helicopter Repairer',
        '15S': '2OH-58D Helicopter Repairer',
        '15T': '2UH-60 Helicopter Repairer',
        '15U': '2CH-47 Helicopter Repairer',
        '15W': '2Unmanned Aircraft Systems Operator',
        '15Y': '1AH-64D Armanment/Electrical/Avionic System Repairer',
        '15Z': '3Aircraft Senior Sergeant',
        '17C': '3Cyber Operations Specialist',
        '17E': '3Electronic Warfare Specialist',
        '18B': '1Special Forces Weapon Sergeant',
        '18C': '1Special Forces Engineer Sergeant',
        '18D': '1Special Forces Medical Sergeant',
        '18E': '1Special Forces Communications Sergeant',
        '18F': '1Special Forces Assistant Operations & Intelligence Sergeant',
        '18X': '1Special Forces Recruit',
        '18Z': '3Special Forces Senior Sergeant',
        '19D': '1Cavalry Scott',
        '19K': '1M1 Armor Crewman',
        '19Z': '3Armor Senior Sergeant',
        '25B': '3Information Technology Specialist',
        '25C': '3Radio Operator Maintainer',
        '25D': '3Cyber Network Defender',
        '25E': '3Electromagnetic Spectrum Manager',
        '25L': '2Cable Systems Installer-Maintainer',
        '25M': '3Multimedia Illustrator',
        '25N': '3Nodal Network Systems Operator-Maintainer',
        '25P': '3Microwave Systems Operator-Maintainer',
        '25Q': '3Multichannel Transmission System Operator-Maintainer',
        '25R': '2Visual Information Equipment Operator-Maintainer',
        '25S': '3Satellite Communication Systems Operator- Maintainer',
        '25T': '3Satellite/Microwave Systems Chief',
        '25U': '3Signal Support Systems Specialist',
        '25V': '3Combat Documentation/Production Specialist',
        '25W': '3Telecommunications Operations Chief',
        '25X': '3Chief Signal NCO',
        '25Z': '3Visual Information Operations Chief',
        '27D': '3Paralegal Specialist',
        '29E': '3Electronic Warfare Specialist',
        '31B': '2Military Police',
        '31D': '3CID Special Agent',
        '31E': '3Internment/Resettlement Specialist',
        '31K': '2Military Working Dog Handler',
        '35F': '3Intelligence Analyst',
        '35G': '3Geospatial Intelligence Imagery Analyst',
        '35L': '3Counter Intelligence Agent',
        '35M': '3Human Intelligence Collector',
        '35N': '3Signals Intelligence Analyst',
        '35P': '3Cryptologic Linguist',
        '35Q': '3Cryptologic Network Warfare Specialist',
        '35S': '3Signals Collector/Analyst',
        '35T': '3Military Intelligence Systems Maintainer/Integrator',
        '35V': '3Signals Intelligence(SIGINT) Senior Sergeant/SIGINT Chief',
        '35X': '3Intelligence Senior Sergeant/Chief Intelligence Sergeant',
        '35Y': '3Chief Counter Intelligence/Human Intelligence Sergeant',
        '35Z': '3Intelligence Sergeant Major',
        '36B': '3Financial Management Technician',
        '37F': '3Psychological Operations Specialist',
        '38B': '3Civil Affairs Specialist',
        '42A': '2Human Resources Specialist',
        '42R': '2Musician',
        '42S': '2Special Band Musician',
        '46Q': '3Public Affairs Specialist',
        '46R': '3Public Affairs Broadcast Specialist',
        '46S': '3Public Affairs Mass Communications Specialist',
        '46Z': '3Chief Public Affairs NCO',
        '51C': '3AI&T Contracting NCO',
        '56M': '3Religious Affairs Specialist',
        '68A': '3Biomedical Equipment Specialist',
        '68B': '3Orthopedic Specialist',
        '68C': '3Practical Nursing Specialist',
        '68D': '3Operating Room Specialist',
        '68E': '3Dental Specialist',
        '68F': '3Physical Therapy Specialist',
        '68G': '3Patient Administration Specialist',
        '68H': '3Optical Laboratory Specialist',
        '68J': '3Medical Logistics Specialist',
        '68K': '3Medical Laboratory Specialist',
        '68L': '3Occupational Therapy Specialist',
        '68M': '3Nutrition Care Specialist',
        '68N': '3Cardiovascular Specialist',
        '68P': '3Radiology Specialist',
        '68Q': '3Pharmacy Specialist',
        '68R': '3Veterinary Food Inspection Specialist',
        '68S': '3Preventive Medicine Specialist',
        '68T': '3Animal Care Specialist',
        '68U': '3Ear, Nose & Throat (ENT) Specialist',
        '68V': '3Respiratory Specialist',
        '68W': '2Health Care Specialist',
        '68X': '3Behavioral Health Specialist',
        '68Y': '3Eye Specialist',
        '68Z': '3Chief Medical NCO',
        '74D': '3CBRN Specialist',
        '79R': '3Recruiter',
        '79S': '3Career Counselor',
        '79T': '3Recruiting & retention NCO',
        '79V': '3Retention & Transition NCO',
        '88H': '1Cargo Specialist',
        '88K': '1Watercraft Operator',
        '88L': '2Watercraft Engineer',
        '88M': '1Motor Transport Operator',
        '88N': '2Transportation Management Coordinator',
        '88U': '3Railway Specialist (RC)',
        '88Z': '3Transportation Senior Sergeant',
        '89A': '3Ammunition & Accounting Specialist',
        '89B': '3Ammunition Specialist',
        '89D': '1Explosive Ordnance Disposal Specialist',
        '91A': '3M1 Abrams Tank System Maintainer',
        '91B': '3Wheeled Vehicle Mechanic',
        '91C': '3Utilities Equipment Repairer',
        '91D': '3Tactical Power Generation Specialist',
        '91E': '3Allied Trades Specialist',
        '91F': '3Small Arms/Towed Artillery Repairer',
        '91G': '3Fire Control Repairer',
        '91H': '3Track Vehicle Repairer',
        '91J': '3Quartermaster & Chemical Equipment Repairer',
        '91L': '3Construction Equipment Repairer',
        '91M': '3Bradley Fighting Vehicle System Maintainer',
        '91P': '3Artillery Mechanic',
        '91S': '3Stryker Systems Maintainer',
        '91X': '3Maintenance Supervisor',
        '91Z': '3Mechanical Maintenance Supervisor',
        '92A': '2Automated Logistical Specialist',
        '92F': '2Petroleum Supply Specialist',
        '92G': '2Culinary Specialist',
        '92L': '3Petroleum Laboratory Specialist',
        '92M': '1Mortuary Affairs Specialist',
        '92R': '2Parachute Rigger',
        '92S': '2Shower & Laundry Specialist (S&L SPC)',
        '92W': '2Water Treatment Specialist',
        '92Y': '3Unit Supply Specialist',
        '92Z': '3Senior Noncommissioned Logistician',
        '94A': '3Land Combat Electronic Missile System Repairer',
        '94D': '3Air Traffic Control Equipment Repairer',
        '94E': '3Radio Equipment Repairer',
        '94F': '3Computer Detection Systems Repairer',
        '94H': '3Test, Maintenance Support Specialist',
        '94M': '3Radar Repairer',
        '94P': '3Multiple Launch Rocket System Repairer',
        '94R': '3Avionic & Survivability Equipment Repairer',
        '94S': '3Patriot System Repairer',
        '94T': '3Short Range Air Defense System Repairer',
        '94W': '3Electronic Maintenance Supervisor',
        '94Y': '3IFTE Operator',
        '94Z': '3Senior Electronic Maintenance Supervisor',
      },
    };
  }

  getInitialState = () => {
    const initialState = {
      dlScoreInput: '',
      dlScore: '0',
      ptScoreInput: '',
      ptScore: '0',
      puScoreInput: '',
      puScore: '0',
      sdcScoreInput: '',
      sdcScore: '0',
      ltScoreInput: '',
      ltScore: '0',
      runScoreInput: '',
      runScore: '0',
      totalScore: '',
      goNoGo: '',
      mosLevel: '',
      mosInput: '',
      mosOutput: '',
      mosError: '',
    };
    return initialState;
  };

  clearState = () => {
    this.setState(this.getInitialState());
  };

  imLazy = () => {
    if (this.state.mosLevel === '1') {
      this.onDLHandler(200, 70);
      this.onPTHandler(8, 70);
      this.onPUHandler(30, 70);
      this.onSDCHandler('2:10', 70);
      this.onLTHandler(5, 70);
      this.onRunHandler('18:00', 70);
    } else if (this.state.mosLevel === '2') {
      this.onDLHandler(180, 65);
      this.onPTHandler(6.5, 65);
      this.onPUHandler(20, 65);
      this.onSDCHandler('2:30', 65);
      this.onLTHandler(3, 65);
      this.onRunHandler('19:00', 65);
    } else if (this.state.mosLevel === '3') {
      this.onDLHandler(140, 60);
      this.onPTHandler(4.5, 60);
      this.onPUHandler(10, 60);
      this.onSDCHandler('3:00', 60);
      this.onLTHandler(1, 60);
      this.onRunHandler('21:00', 60);
    }
  };

  getMOSInfo = e => {
    let mos;
    let mosDesc = this.state.mosDesc;
    let invalid = (
      <Text
        style={{
          height: 35,
          color: 'white',
          fontSize: 20,
          fontWeight: '500',
          backgroundColor: 'red',
          textAlign: 'center',
          paddingTop: '3%',
          flex: 1,
          flexWrap: 'wrap',
        }}>
        Invalid MOS
      </Text>
    );

    if (mosDesc[e]) {
      mos = mosDesc[e].substring(1, 100);
      return (
        <Text
          style={{
            color: 'black',
            fontSize: 13,
            fontWeight: '500',
            flex: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          {mos}
        </Text>
      );
    } else if (e !== '' && e.length >= 3 && !mosDesc[e]) {
      return invalid;
    }
  };

  getLevel(e) {
    let i;
    let mosDesc = this.state.mosDesc;
    e = this.state.mosInput;

    if (mosDesc[e]) {
      i = mosDesc[e].substring(0, 1);
      if (i.charAt(0) != 1 && i.charAt(0) != 2 && i.charAt(0) != 3) {
        return null;
      } else if (i.charAt(0) == 1) {
        return (
          <Text
            style={{
              width: wp('40%'),
              height: 40,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'black',
              color: 'white',
              paddingTop: '4%',
              marginBottom: hp('3%'),
            }}>
            HEAVY
          </Text>
        );
      } else if (i.charAt(0) == 2) {
        return (
          <Text
            style={{
              width: wp('40%'),
              height: 40,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'blue',
              color: 'white',
              paddingTop: '4%',
              marginBottom: hp('3%'),
            }}>
            SIGNIFICANT
          </Text>
        );
      } else if (i.charAt(0) == 3) {
        return (
          <Text
            style={{
              width: wp('40%'),
              height: 40,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'pink',
              color: 'white',
              paddingTop: '4%',
              marginBottom: hp('3%'),
            }}>
            MODERATE
          </Text>
        );
      }
    }
  }

  onDLHandler = (e, x) => {
    this.setState({ dlScore: x });
    this.setState({ dlScoreInput: e });
  };

  onPTHandler = (e, x) => {
    this.setState({ ptScoreInput: e });
    this.setState({ ptScore: x });
  };

  onPUHandler = (e, x) => {
    this.setState({ puScoreInput: e });
    this.setState({ puScore: x });
  };

  onSDCHandler = (e, x) => {
    this.setState({ sdcScoreInput: e });
    this.setState({ sdcScore: x });
  };

  onLTHandler = (e, x) => {
    this.setState({ ltScoreInput: e });
    this.setState({ ltScore: x });
  };

  onRunHandler = (e, x) => {
    this.setState({ runScoreInput: e });
    this.setState({ runScore: x });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mosInput !== this.state.mosInput) {
      let mosDesc = this.state.mosDesc;
      let e = this.state.mosInput;
      if (mosDesc[e]) {
        var lvl = mosDesc[this.state.mosInput].substring(0, 1);
        if (this.state.mosLevel != lvl) {
          this.setState({ mosLevel: lvl });
          this.onDLHandler(0,0)
          this.onPTHandler(0,0);
          this.onPUHandler(0,0);
          this.onSDCHandler(0,0);
          this.onLTHandler(0,0);
          this.onRunHandler(0,0);
        }
      }
    }
    if (this.state.dlScore === undefined) {
      this.setState({ dlScore: '0' });
    } else if (this.state.ltScore === undefined) {
      this.setState({ ltScore: '0' });
    } else if (this.state.ptScore === undefined) {
      this.setState({ ptScore: '0' });
    } else if (this.state.runScore === undefined) {
      this.setState({ runScore: '0' });
    } else if (this.state.sdcScore === undefined) {
      this.setState({ sdcScore: '0' });
    } else if (this.state.puScore === undefined) {
      this.setState({ puScore: '0' });
    }
  }

  splashScreen = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000)
    );
  };

  async componentDidMount() {
    const data = await this.splashScreen();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  startVibrating = () => {
    Vibration.vibrate(DURATION);
  };

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header title="ACFT Calculator" />
        </View>
        <View style={styles.mosInfoContainer}>
          <View style={styles.mosInput}>
            <Text style={styles.enterMOS}>Enter MOS</Text>
            <TextInput
              style={
                this.state.mosError != 'MOS Required'
                  ? styles.input
                  : styles.mosError
              }
              autoCapitalize="characters"
              maxLength={4}
              minLength={3}
              autoCorrect={false}
              onChangeText={mosOutput => this.setState({ mosInput: mosOutput })}
              value={this.state.mosInput}
            />
            {!!this.state.mosError && (
              <Text
                style={{
                  paddingTop: hp('1%'),
                  textAlign: 'center',
                  fontSize: 15,
                  color: 'red',
                }}>
                {this.state.mosError}
              </Text>
            )}
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.mosText}>
              <Text
                style={{
                  paddingBottom: hp('6%'),
                  paddingTop: hp('4%'),
                  fontSize: 15,
                }}>
                Job:{' '}
              </Text>
              <Text style={{ paddingRight: wp('1%'), fontSize: 15 }}>
                Level:{' '}
              </Text>
            </View>
            <View style={styles.mosOutput}>
              <View style={styles.mosOutputText}>
                {this.getMOSInfo(this.state.mosInput)}
              </View>
              <View style={styles.mosLevelText}>
                {this.getLevel(this.state.mosInput)}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
          }}
        />
        <View style={styles.eventContainer}>
          <KeyboardAvoidingView
            behavior="position"
            enabled
            keyboardVerticalOffset={100}
            onTouchStart={() => {
              if (this.state.mosLevel.trim() === '') {
                this.setState(() => ({ mosError: 'MOS Required' }));
              } else {
                this.setState(() => ({ mosError: null }));
              }
            }}>
            <ScrollView>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}>
                <View>
                  <View>
                    <Deadlift
                      mosLevel={this.state.mosLevel}
                      onDLHandler={this.onDLHandler}
                      dlScoreInput={this.state.dlScoreInput}
                      dlScore={this.state.dlScore}
                    />
                  </View>
                  <View>
                    <PowerThrow
                      mosLevel={this.state.mosLevel}
                      onPTHandler={this.onPTHandler}
                      ptScoreInput={this.state.ptScoreInput}
                      ptScore={this.state.ptScore}
                    />
                  </View>

                  <View>
                    <ReleasePushups
                      mosLevel={this.state.mosLevel}
                      onPUHandler={this.onPUHandler}
                      puScoreInput={this.state.puScoreInput}
                      puScore={this.state.puScore}
                    />
                  </View>

                  <View>
                    <SprintDragCarry
                      mosLevel={this.state.mosLevel}
                      onSDCHandler={this.onSDCHandler}
                      sdcScoreInput={this.state.sdcScoreInput}
                      sdcScore={this.state.sdcScore}
                    />
                  </View>

                  <View>
                    <LegTuck
                      mosLevel={this.state.mosLevel}
                      onLTHandler={this.onLTHandler}
                      ltScoreInput={this.state.ltScoreInput}
                      ltScore={this.state.ltScore}
                    />
                  </View>

                  <View>
                    <Run
                      mosLevel={this.state.mosLevel}
                      onRunHandler={this.onRunHandler}
                      runScoreInput={this.state.runScoreInput}
                      runScore={this.state.runScore}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
            paddingBottom: 2,
          }}
        />
        <View style={styles.scoreContainer}>
          <Score
            clearState={this.clearState}
            mosLevel={this.state.mosLevel}
            imLazy={this.imLazy}
            dlScore={this.state.dlScore}
            ptScore={this.state.ptScore}
            puScore={this.state.puScore}
            sdcScore={this.state.sdcScore}
            ltScore={this.state.ltScore}
            runScore={this.state.runScore}
          />
        </View>
        <View style={styles.footerContainer}>
          <Footer title="3932 - Group" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: 'green',
  },
  mosInfoContainer: {
    paddingLeft: wp('5%'),
    width: wp('100%'),
    height: hp('21%'),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  eventContainer: {
    width: wp('100%'),
    height: hp('47%'),
    justifyContent: 'space-evenly',
  },
  scoreContainer: {
    width: wp('100%'),
    height: hp('20%'),
    borderTopWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  footerContainer: {
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: 'green',
  },
  mosInput: {
    flexDirection: 'column',
    textAlign: 'right',
    paddingRight: wp('10%'),
    paddingTop: hp('1%'),
  },
  mosText: {
    textAlign: 'right',
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
  },
  mosOutput: {
    paddingTop: hp('4%'),
  },
  mosOutputText: {
    width: wp('40%'),
    height: 35,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mosLevelText: {
    width: wp('40%'),
    height: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: hp('3%'),
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: wp('27%'),
    height: hp('7%'),
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  mosError: {
    borderColor: 'red',
    borderWidth: 2,
    width: wp('27%'),
    height: hp('7%'),
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  enterMOS: {
    fontSize: hp('2.5%'),
    paddingTop: hp('2.5%'),
    paddingBottom: hp('1%'),
    textAlign: 'center',
    justifyContent: 'center',
  },
});
