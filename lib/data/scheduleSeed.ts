import type { Shift, Day } from '../../features/schedule/types';

import OMAR_IMAGE from '../../assets/images/omar-px.png';
import ELIJAH_IMAGE from '../../assets/images/elijah-px.png';

export const SEED_DAYS: Day[] = [
  { day: 'Fri', date: 16, hasDot: false },
  { day: 'Sat', date: 17, hasDot: false },
  { day: 'Sun', date: 18, hasDot: true },
  { day: 'Mon', date: 19, hasDot: true },
  { day: 'Tue', date: 20, hasDot: true },
  { day: 'Wed', date: 21, hasDot: true },
  { day: 'Thu', date: 22, hasDot: true },
];

export const SEED_SHIFTS: Shift[] = [
  // ─── 07:00
  {
    id: '1',
    time: '07:00',
    title: 'Vroege Overdracht',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '07:00 - 15:00',
    variant: 'primary',
    description:
      'Overdracht van de nachtdienst naar de ochtenddienst. Bespreking van kritieke patiënten en lopende behandelingen.',
    serviceName: 'Vroeg 07:00-15:00',
    room: 'Overdrachtsruimte',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '07:00 - 15:00',
      },
      {
        id: 't2',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '15:00 - 11:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: 'Gisteren 22:45',
        text: 'Nachtdienst verloopt rustig. Patiënt 4B heeft extra monitoring nodig.',
      },
      {
        id: 'n2',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: 'Gisteren 22:45',
        text: 'Nachtdienst verloopt rustig. Patiënt 4B heeft extra monitoring nodig.',
      },
    ],
  },

  // ─── 07:30
  {
    id: '2',
    time: '07:30',
    title: 'Vitale Controles',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '07:00 - 15:00',
    variant: 'secondary',
    description:
      'Ochtendrondes voor meting van vitale functies op afdeling A en B. Bloeddruk, hartslag en temperatuur worden geregistreerd.',
    serviceName: 'Ochtend 07:00-15:00',
    room: 'Afdeling A & B',
    team: [
      {
        id: 't1',
        names: 'Omar r.',
        members: [{ image: OMAR_IMAGE, initial: 'O', color: '#818CF8' }],
        timeRange: '07:00 - 15:00',
      },
    ],
    notes: [],
  },

  // ─── 08:00
  {
    id: '3',
    time: '08:00',
    title: 'Medicatieronde',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '08:00 - 16:00',
    variant: 'tertiary',
    description:
      'Uitdelen en toedienen van ochtendmedicatie aan alle patiënten op afdeling C. Controle op bijwerkingen en reacties.',
    serviceName: 'Ochtend 08:00-16:00',
    room: 'Afdeling C',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '08:00 - 16:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Omar r',
        authorImage: OMAR_IMAGE,
        authorInitial: 'O',
        time: '8 min geleden',
        text: 'Medicatie voor kamer 12 is aangevuld.',
      },
      {
        id: 'n2',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '30 min geleden',
        text: 'Patiënten 3 en 7 zijn stabiel en klaar voor ontslag morgen.',
      },
    ],
  },

  // ─── 08:30
  {
    id: '4',
    time: '08:30',
    title: 'Patiëntengesprekken',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '08:00 - 16:00',
    variant: 'primary',
    description:
      'Geplande gesprekken met patiënten over behandelingsvoortgang, vragen en nazorgplannen.',
    serviceName: 'Ochtend 08:00-16:00',
    room: 'Spreekkamer 1',
    team: [
      {
        id: 't1',
        names: 'Omar r.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '08:00 - 16:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '30 min geleden',
        text: 'Patiënten 3 en 7 zijn stabiel en klaar voor ontslag morgen.',
      },
      {
        id: 'n2',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '30 min geleden',
        text: 'Patiënten 3 en 7 zijn stabiel en klaar voor ontslag morgen.',
      },
    ],
  },

  // ─── 09:00
  {
    id: '5',
    time: '09:00',
    title: 'Chirurgische Intake',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '09:00 - 17:00',
    variant: 'secondary',
    description:
      'Intake en voorbereiding van patiënten die vandaag een chirurgische ingreep ondergaan. Aanmeldformulieren en toestemmingsverklaringen worden getekend.',
    serviceName: 'Ochtend 09:00-17:00',
    room: 'OK-Voorbereiding',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '09:00 - 17:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '5 min geleden',
        text: 'Toestemmingsverklaringen volledig ingevuld en gearchiveerd.',
      },
    ],
  },

  {
    id: '6',
    time: '09:30',
    title: 'Teamoverleg',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '09:00 - 17:00',
    variant: 'tertiary',
    isCurrent: true,
    description:
      'Wekelijks teamoverleg over patiëntenzorg, nieuwe protocollen en planning van de komende week.',
    serviceName: 'Overleg 09:00-17:00',
    room: 'Vergaderzaal 2',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '09:00 - 17:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Omar r',
        authorImage: OMAR_IMAGE,
        authorInitial: 'O',
        time: '2 min geleden',
        text: 'Agenda verstuurd naar alle teamleden.',
      },
    ],
  },

  // ─── 10:00
  {
    id: '7',
    time: '10:00',
    title: 'Wondverzorging',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '10:00 - 18:00',
    variant: 'primary',
    description:
      'Verbandwisselingen en wondcontrole bij postoperatieve patiënten. Documentatie van herstelvoortgang.',
    serviceName: 'Ochtend 10:00-18:00',
    room: 'Verkoeverruimte',
    team: [
      {
        id: 't1',
        names: 'Omar r.',
        members: [{ image: OMAR_IMAGE, initial: 'O', color: '#818CF8' }],
        timeRange: '10:00 - 18:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Omar r',
        authorImage: OMAR_IMAGE,
        authorInitial: 'O',
        time: '15 min geleden',
        text: 'Patiënt kamer 7 toont goede genezing, verband gewisseld.',
      },
    ],
  },

  // ─── 10:30
  {
    id: '8',
    time: '10:30',
    title: 'Postoperatieve Controles',
    date: '10-02-2024',
    person: 'Elijah a.',
    personImage: ELIJAH_IMAGE,
    status: 'Beschikbaar',
    timeRange: '10:00 - 18:00',
    variant: 'secondary',
    description:
      'Nacontrole van patiënten die gisteren een operatie hebben ondergaan. Beoordeling van pijn, mobiliteit en wondgenezing.',
    serviceName: 'Ochtend 10:00-18:00',
    room: 'Afdeling B',
    team: [
      {
        id: 't1',
        names: 'Elijah a.',
        members: [{ image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' }],
        timeRange: '10:00 - 18:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '30 min geleden',
        text: 'Patiënten 3 en 7 zijn stabiel en klaar voor ontslag morgen.',
      },
    ],
  },

  // ─── 11:00
  {
    id: '9',
    time: '11:00',
    title: 'Multidisciplinair Overleg',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '12:00 - 20:00',
    variant: 'tertiary',
    description:
      'Multidisciplinair overleg (MDO) met specialisten, verpleegkundigen en paramedici voor complexe patiëntcasussen.',
    serviceName: 'MDO 12:00-20:00',
    room: 'Vergaderzaal 1',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '12:00 - 20:00',
      },
    ],
    notes: [],
  },

  // ─── 11:30
  {
    id: '10',
    time: '11:30',
    title: 'Nacontrole Afdeling C',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '12:00 - 20:00',
    variant: 'primary',
    description:
      'Reguliere nacontroles op afdeling C. Beoordeling van herstelproces en bijwerken van patiëntendossiers.',
    serviceName: 'Middag 12:00-20:00',
    room: 'Afdeling C',
    team: [
      {
        id: 't1',
        names: 'Omar r.',
        members: [{ image: OMAR_IMAGE, initial: 'O', color: '#818CF8' }],
        timeRange: '12:00 - 20:00',
      },
    ],
    notes: [],
  },

  // ─── 12:00
  {
    id: '11',
    time: '12:00',
    title: 'Ontslaggesprekken',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '12:00 - 20:00',
    variant: 'secondary',
    description:
      'Afsluitende gesprekken met patiënten die vandaag worden ontslagen. Overdracht van nazorginstructies en follow-up afspraken.',
    serviceName: 'Middag 12:00-20:00',
    room: 'Spreekkamer 3',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '12:00 - 20:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Omar r',
        authorImage: OMAR_IMAGE,
        authorInitial: 'O',
        time: '10 min geleden',
        text: 'Patiënt 9 heeft ontslagbrief ontvangen en bevestigd.',
      },
    ],
  },

  // ─── 12:30
  {
    id: '12',
    time: '12:30',
    title: 'Middagmedicatie',
    date: '10-02-2024',
    person: 'Elijah a.',
    personImage: ELIJAH_IMAGE,
    status: 'Beschikbaar',
    timeRange: '12:00 - 20:00',
    variant: 'tertiary',
    description:
      'Middagmedicatieronde voor alle afdelingen. Extra aandacht voor patiënten met pijnstillersschema.',
    serviceName: 'Middag 12:00-20:00',
    room: 'Afdeling A & C',
    team: [
      {
        id: 't1',
        names: 'Elijah a.',
        members: [{ image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' }],
        timeRange: '12:00 - 20:00',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Elijah a',
        authorImage: ELIJAH_IMAGE,
        authorInitial: 'E',
        time: '5 min geleden',
        text: 'Medicatie afdeling A afgerond. Afdeling C volgt.',
      },
    ],
  },

  // ─── 13:00
  {
    id: '13',
    time: '13:00',
    title: 'Administratie & Dossiers',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '13:00 - 21:00',
    variant: 'primary',
    description:
      'Bijwerken van patiëntendossiers, verwerken van uitslagen en afstemming met behandelend artsen over vervolgbeleid.',
    serviceName: 'Middag 13:00-21:00',
    room: 'Verpleegpost',
    team: [
      {
        id: 't1',
        names: 'Omar r.',
        members: [{ image: OMAR_IMAGE, initial: 'O', color: '#818CF8' }],
        timeRange: '13:00 - 21:00',
      },
    ],
    notes: [],
  },

  // ─── 13:30
  {
    id: '14',
    time: '13:30',
    title: 'Diagnostiek & Lab',
    date: '10-02-2024',
    person: 'Elijah a.',
    personImage: ELIJAH_IMAGE,
    status: 'Beschikbaar',
    timeRange: '13:00 - 21:00',
    variant: 'secondary',
    description:
      'Begeleiden van diagnostische procedures en coördinatie met het laboratorium voor spoeduitslagen.',
    serviceName: 'Middag 13:00-21:00',
    room: 'Diagnostisch Centrum',
    team: [
      {
        id: 't1',
        names: 'Elijah a.',
        members: [{ image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' }],
        timeRange: '13:00 - 21:00',
      },
    ],
    notes: [],
  },

  // ─── 14:00
  {
    id: '15',
    time: '14:00',
    title: 'Middagrondes',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '14:30 - 22:30',
    variant: 'tertiary',
    description:
      'Middagrondes op alle afdelingen. Controle van vitale parameters en beoordeling van patiëntcomfort.',
    serviceName: 'Middag 14:30-22:30',
    room: 'Alle Afdelingen',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '14:30 - 22:30',
      },
    ],
    notes: [],
  },

  // ─── 14:30
  {
    id: '16',
    time: '14:30',
    title: 'Overdracht Avonddienst',
    date: '10-02-2024',
    person: 'Omar r.',
    personImage: OMAR_IMAGE,
    status: 'Beschikbaar',
    timeRange: '14:30 - 22:30',
    variant: 'primary',
    description:
      'Overdracht van de dagdienst naar de avonddienst. Statusupdate van alle patiënten en bijzonderheden van de dag.',
    serviceName: 'Overdracht 14:30-22:30',
    room: 'Overdrachtsruimte',
    team: [
      {
        id: 't1',
        names: 'Omar r., Elijah a.',
        members: [
          { image: OMAR_IMAGE, initial: 'O', color: '#818CF8' },
          { image: ELIJAH_IMAGE, initial: 'E', color: '#FB923C' },
        ],
        timeRange: '14:30 - 22:30',
      },
    ],
    notes: [
      {
        id: 'n1',
        author: 'Omar r',
        authorImage: OMAR_IMAGE,
        authorInitial: 'O',
        time: '1 min geleden',
        text: 'Overdracht voorbereid, avondploeg is geïnformeerd.',
      },
    ],
  },
];
