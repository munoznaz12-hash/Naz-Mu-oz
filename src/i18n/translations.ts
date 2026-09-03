export type AppLanguage = 'es' | 'en' | 'pt' | 'fr';

export type ThemeMode = 'light' | 'dark';

export type ThemeColor = 
  | 'blue'      // Azul Tránsito (Default)
  | 'emerald'   // Esmeralda Vial
  | 'purple'    // Púrpura Inteligente
  | 'amber'     // Ámbar Preventivo
  | 'crimson'   // Rojo Reglamentario
  | 'cyan'      // Cian Urbano
  | 'indigo'    // Índigo Metropolitano
  | 'rose';     // Rosa Vital

export interface ThemeColorOption {
  id: ThemeColor;
  name: Record<AppLanguage, string>;
  primaryHex: string;
  primaryHoverHex: string;
  accentHex: string;
  bgLightHex: string;
  borderLightHex: string;
  badgeBg: string;
  badgeText: string;
  gradientFrom: string;
  gradientTo: string;
  previewBg: string;
}

export const THEME_COLOR_OPTIONS: ThemeColorOption[] = [
  {
    id: 'blue',
    name: {
      es: 'Azul Tránsito (Oficial)',
      en: 'Traffic Blue (Official)',
      pt: 'Azul Trânsito (Oficial)',
      fr: 'Bleu Circulation (Officiel)'
    },
    primaryHex: '#0052cc',
    primaryHoverHex: '#0043a8',
    accentHex: '#0072ff',
    bgLightHex: '#eff6ff',
    borderLightHex: '#bfdbfe',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    gradientFrom: 'from-[#0052cc]',
    gradientTo: 'to-[#0a2540]',
    previewBg: 'bg-[#0052cc]'
  },
  {
    id: 'emerald',
    name: {
      es: 'Esmeralda Eco-Vial',
      en: 'Emerald Eco-Road',
      pt: 'Esmeralda Eco-Viária',
      fr: 'Émeraude Éco-Route'
    },
    primaryHex: '#059669',
    primaryHoverHex: '#047857',
    accentHex: '#10b981',
    bgLightHex: '#ecfdf5',
    borderLightHex: '#a7f3d0',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    gradientFrom: 'from-[#059669]',
    gradientTo: 'to-[#064e3b]',
    previewBg: 'bg-[#059669]'
  },
  {
    id: 'purple',
    name: {
      es: 'Púrpura Inteligente',
      en: 'Smart Purple',
      pt: 'Púrpura Inteligente',
      fr: 'Pourpre Intelligent'
    },
    primaryHex: '#7c3aed',
    primaryHoverHex: '#6d28d9',
    accentHex: '#8b5cf6',
    bgLightHex: '#f5f3ff',
    borderLightHex: '#ddd6fe',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    gradientFrom: 'from-[#7c3aed]',
    gradientTo: 'to-[#3b0764]',
    previewBg: 'bg-[#7c3aed]'
  },
  {
    id: 'amber',
    name: {
      es: 'Ámbar Preventivo',
      en: 'Amber Warning',
      pt: 'Âmbar Preventivo',
      fr: 'Ambre Préventif'
    },
    primaryHex: '#d97706',
    primaryHoverHex: '#b45309',
    accentHex: '#f59e0b',
    bgLightHex: '#fffbeb',
    borderLightHex: '#fde68a',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    gradientFrom: 'from-[#d97706]',
    gradientTo: 'to-[#78350f]',
    previewBg: 'bg-[#d97706]'
  },
  {
    id: 'crimson',
    name: {
      es: 'Rojo Reglamentario',
      en: 'Regulatory Crimson',
      pt: 'Vermelho Regulamentar',
      fr: 'Rouge Réglementaire'
    },
    primaryHex: '#dc2626',
    primaryHoverHex: '#b91c1c',
    accentHex: '#ef4444',
    bgLightHex: '#fef2f2',
    borderLightHex: '#fecaca',
    badgeBg: 'bg-red-100 dark:bg-red-950/60',
    badgeText: 'text-red-700 dark:text-red-300',
    gradientFrom: 'from-[#dc2626]',
    gradientTo: 'to-[#450a0a]',
    previewBg: 'bg-[#dc2626]'
  },
  {
    id: 'cyan',
    name: {
      es: 'Cian Urbano',
      en: 'Urban Cyan',
      pt: 'Ciano Urbano',
      fr: 'Cyan Urbain'
    },
    primaryHex: '#0891b2',
    primaryHoverHex: '#0e7490',
    accentHex: '#06b6d4',
    bgLightHex: '#ecfeff',
    borderLightHex: '#a5f3fc',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    gradientFrom: 'from-[#0891b2]',
    gradientTo: 'to-[#164e63]',
    previewBg: 'bg-[#0891b2]'
  },
  {
    id: 'indigo',
    name: {
      es: 'Índigo Metropolitano',
      en: 'Metropolitan Indigo',
      pt: 'Índigo Metropolitano',
      fr: 'Indigo Métropolitain'
    },
    primaryHex: '#4f46e5',
    primaryHoverHex: '#4338ca',
    accentHex: '#6366f1',
    bgLightHex: '#eef2ff',
    borderLightHex: '#c7d2fe',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    gradientFrom: 'from-[#4f46e5]',
    gradientTo: 'to-[#1e1b4b]',
    previewBg: 'bg-[#4f46e5]'
  },
  {
    id: 'rose',
    name: {
      es: 'Rosa Vital',
      en: 'Vital Rose',
      pt: 'Rosa Vital',
      fr: 'Rose Vital'
    },
    primaryHex: '#e11d48',
    primaryHoverHex: '#be123c',
    accentHex: '#f43f5e',
    bgLightHex: '#fff1f2',
    borderLightHex: '#fecdd3',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    gradientFrom: 'from-[#e11d48]',
    gradientTo: 'to-[#4c0519]',
    previewBg: 'bg-[#e11d48]'
  }
];

export const TRANSLATIONS: Record<AppLanguage, Record<string, string>> = {
  es: {
    // Brand & App
    appName: 'ViaNova',
    appSubtitle: 'Movilidad Inteligente',
    portalTagline: 'Sistema Integral de Movilidad y Educación Vial',
    footerCopyright: '© 2026 ViaNova. Basado en el Código Nacional de Tránsito (Ley 769/2002) y Ley 2251/2022.',
    
    // Navigation
    nav_home: 'Inicio',
    nav_search: 'Búsqueda',
    nav_education: 'Educación Vial',
    nav_signs: 'Señales de Tránsito',
    nav_quiz: 'Quiz',
    nav_simulator: 'Simulador Examen',
    nav_reports: 'Reportes en Vía',
    nav_profile: 'Mi Perfil',
    nav_login: 'Iniciar Sesión',
    nav_register: 'Registrarme',
    nav_logout: 'Salir',
    nav_appearance: 'Apariencia & Idioma',
    
    // Quick Actions & Search
    search_placeholder: 'Buscar por norma, señal (SR-01), velocidad, campaña, ley...',
    search_title: 'Centro de Búsqueda Inteligente • ViaNova Colombia',
    search_heading: 'Encuentra al instante lo que necesitas en ViaNova',
    search_sub: 'Localiza contenidos sobre educación vial, señales de tránsito, campañas ciudadanas, simuladores y recursos descargables.',
    search_category_all: 'Todos los Contenidos',
    search_category_edu: 'Educación Vial',
    search_category_signs: 'Señales de Tránsito',
    search_category_campaigns: 'Campañas Viales',
    search_category_resources: 'Recursos & Manuales',
    search_category_eval: 'Simulador & Exámenes',
    search_category_reports: 'Reportes en Vía',
    search_frequent: 'Búsquedas frecuentes:',
    search_results_title: 'Resultados de la Búsqueda',
    search_download_res: 'Descargar Archivo Oficial',
    search_open_finder: 'Abrir buscador',
    search_prompt: '¿Qué deseas consultar hoy en ViaNova?',

    // Dashboard
    dash_welcome_title: 'Portal de Educación y Certificación Vial',
    dash_welcome_sub: 'Prepárate con normatividad colombiana actualizada (Ley 2251 Ley Julián Esteban y Ley 769). Realiza simulacros oficiales tipo CEA/RUNT y reporta incidencias.',
    dash_quick_search: 'Búsqueda Rápida',
    dash_quick_simulator: 'Simulador RUNT',
    dash_stat_safety_score: 'Puntaje de Seguridad',
    dash_stat_training_hrs: 'Horas Capacitación',
    dash_stat_approved_exams: 'Simulacros Aprobados',
    dash_stat_active_reports: 'Reportes Activos',
    dash_points_max: 'de 100 pts',
    dash_hours_unit: 'horas certificadas',
    dash_exams_unit: 'exámenes oficiales',
    dash_reports_unit: 'incidencias en vía',
    dash_modules_title: 'Módulos del Sistema ViaNova',
    dash_modules_sub: 'Herramientas pedagógicas, simuladores oficiales y participación ciudadana.',

    // Theme & Language Settings Modal
    settings_modal_title: 'Personalización de Apariencia & Idioma',
    settings_modal_sub: 'Ajusta el tema visual, colores y el idioma de la plataforma a tu preferencia.',
    settings_section_lang: 'Seleccionar Idioma de la Plataforma',
    settings_section_mode: 'Modo de Visualización',
    settings_mode_light: 'Modo Claro',
    settings_mode_dark: 'Modo Oscuro (Nocturno)',
    settings_section_color: 'Paleta de Color de Acento',
    settings_save_btn: 'Guardar y Aplicar Preferencias',
    settings_applied_toast: 'Configuración de apariencia e idioma guardada con éxito.',
    settings_close: 'Cerrar',

    // Languages Names
    lang_es: 'Español (Colombia)',
    lang_en: 'English (US)',
    lang_pt: 'Português (Brasil)',
    lang_fr: 'Français (France)',

    // Profile & ID
    profile_title: 'Credencial Digital & Perfil',
    profile_sub: 'Expediente oficial del usuario en la plataforma de movilidad ViaNova.',
    profile_digital_id: 'VIANOVA DRIVER DIGITAL ID',
    profile_registered_holder: 'Titular Registrado',
    profile_runt_id: 'Identificador RUNT',
    profile_license_cat: 'Categoría Licencia',
    profile_status_on_road: 'Estado en Vía',
    profile_status_enabled: 'Habilitado 2026',
    profile_qr_badge: 'Validación QR Digital',
    profile_share: 'Compartir Credencial',
    profile_share_success: '¡Enlace de credencial copiado!',
    profile_user_data: 'Datos del Usuario',
    profile_full_name: 'Nombre Completo',
    profile_email: 'Correo Electrónico',
    profile_type: 'Tipo de Perfil',
    profile_achievements: 'Insignias de Movilidad Segura en Colombia',

    // Education & Signs
    edu_title: 'Módulos Pedagógicos de Tránsito',
    edu_sub: 'Capacitación interactiva basada en el Código Nacional de Tránsito y la Ley 2251.',
    signs_title: 'Catálogo de Señalización Vial de Colombia',
    signs_sub: 'Norma técnica Mintransporte con señales reglamentarias, preventivas e informativas.',
    quiz_title: 'Quiz Rápido de Conocimientos',
    sim_title: 'Simulador de Examen Teórico RUNT',
    reports_title: 'Reportes e Incidencias en Vía',
  },
  en: {
    // Brand & App
    appName: 'ViaNova',
    appSubtitle: 'Smart Mobility',
    portalTagline: 'Comprehensive Mobility & Road Safety Education System',
    footerCopyright: '© 2026 ViaNova. Compliant with National Traffic Code (Law 769/2002) and Law 2251/2022.',
    
    // Navigation
    nav_home: 'Home',
    nav_search: 'Search',
    nav_education: 'Road Education',
    nav_signs: 'Traffic Signs',
    nav_quiz: 'Quiz',
    nav_simulator: 'Exam Simulator',
    nav_reports: 'Road Reports',
    nav_profile: 'My Profile',
    nav_login: 'Log In',
    nav_register: 'Sign Up',
    nav_logout: 'Log Out',
    nav_appearance: 'Appearance & Language',
    
    // Quick Actions & Search
    search_placeholder: 'Search by rule, sign (SR-01), speed limits, campaigns, laws...',
    search_title: 'Intelligent Search Hub • ViaNova Colombia',
    search_heading: 'Instantly find whatever you need in ViaNova',
    search_sub: 'Locate road safety modules, traffic signs, citizen campaigns, exam simulators, and downloadable manuals.',
    search_category_all: 'All Content',
    search_category_edu: 'Road Education',
    search_category_signs: 'Traffic Signs',
    search_category_campaigns: 'Safety Campaigns',
    search_category_resources: 'Resources & Manuals',
    search_category_eval: 'Simulators & Tests',
    search_category_reports: 'Road Reports',
    search_frequent: 'Frequent searches:',
    search_results_title: 'Search Results',
    search_download_res: 'Download Official File',
    search_open_finder: 'Open search engine',
    search_prompt: 'What would you like to look up in ViaNova today?',

    // Dashboard
    dash_welcome_title: 'Road Safety & Driver Certification Portal',
    dash_welcome_sub: 'Get prepared with updated Colombian road regulations (Law 2251 and Law 769). Practice official CEA/RUNT theoretical mock exams and report roadway issues.',
    dash_quick_search: 'Quick Search',
    dash_quick_simulator: 'RUNT Simulator',
    dash_stat_safety_score: 'Safety Score',
    dash_stat_training_hrs: 'Training Hours',
    dash_stat_approved_exams: 'Passed Mocks',
    dash_stat_active_reports: 'Active Reports',
    dash_points_max: 'out of 100 pts',
    dash_hours_unit: 'certified hours',
    dash_exams_unit: 'official exams',
    dash_reports_unit: 'reported incidents',
    dash_modules_title: 'ViaNova System Modules',
    dash_modules_sub: 'Educational tools, official exam simulators, and citizen road reporting.',

    // Theme & Language Settings Modal
    settings_modal_title: 'Appearance & Language Customization',
    settings_modal_sub: 'Customize the visual theme, accent colors, and display language according to your preferences.',
    settings_section_lang: 'Select Platform Language',
    settings_section_mode: 'Display Mode',
    settings_mode_light: 'Light Mode',
    settings_mode_dark: 'Dark Mode (Night)',
    settings_section_color: 'Accent Color Palette',
    settings_save_btn: 'Save & Apply Preferences',
    settings_applied_toast: 'Appearance and language settings saved successfully.',
    settings_close: 'Close',

    // Languages Names
    lang_es: 'Español (Spanish)',
    lang_en: 'English (US)',
    lang_pt: 'Português (Portuguese)',
    lang_fr: 'Français (French)',

    // Profile & ID
    profile_title: 'Digital Credential & Profile',
    profile_sub: 'Official user file within the ViaNova road mobility ecosystem.',
    profile_digital_id: 'VIANOVA DRIVER DIGITAL ID',
    profile_registered_holder: 'Registered Holder',
    profile_runt_id: 'RUNT Identifier',
    profile_license_cat: 'License Category',
    profile_status_on_road: 'Road Status',
    profile_status_enabled: 'Authorized 2026',
    profile_qr_badge: 'Digital QR Validation',
    profile_share: 'Share Credential',
    profile_share_success: 'Credential link copied to clipboard!',
    profile_user_data: 'User Details',
    profile_full_name: 'Full Name',
    profile_email: 'Email Address',
    profile_type: 'Profile Type',
    profile_achievements: 'Safe Mobility Badges in Colombia',

    // Education & Signs
    edu_title: 'Road Safety Pedagogical Modules',
    edu_sub: 'Interactive training based on National Traffic Code and Law 2251.',
    signs_title: 'Colombia Road Signage Catalog',
    signs_sub: 'Ministry of Transportation technical standards with regulatory, warning, and informational signs.',
    quiz_title: 'Quick Knowledge Quiz',
    sim_title: 'RUNT Driver License Exam Simulator',
    reports_title: 'Road Incidents & Citizen Reports',
  },
  pt: {
    // Brand & App
    appName: 'ViaNova',
    appSubtitle: 'Mobilidade Inteligente',
    portalTagline: 'Sistema Integral de Mobilidade e Educação no Trânsito',
    footerCopyright: '© 2026 ViaNova. Em conformidade com o Código Nacional de Trânsito.',
    
    // Navigation
    nav_home: 'Início',
    nav_search: 'Pesquisa',
    nav_education: 'Educação Viária',
    nav_signs: 'Sinais de Trânsito',
    nav_quiz: 'Quiz',
    nav_simulator: 'Simulador de Exame',
    nav_reports: 'Relatórios na Via',
    nav_profile: 'Meu Perfil',
    nav_login: 'Entrar',
    nav_register: 'Registrar-se',
    nav_logout: 'Sair',
    nav_appearance: 'Aparência & Idioma',
    
    // Quick Actions & Search
    search_placeholder: 'Buscar por normas, placas (SR-01), velocidade, campanhas, leis...',
    search_title: 'Centro de Pesquisa Inteligente • ViaNova',
    search_heading: 'Encontre instantaneamente o que precisa no ViaNova',
    search_sub: 'Localize conteúdos sobre educação para o trânsito, placas, campanhas cidadãs, simuladores e manuais.',
    search_category_all: 'Todos os Conteúdos',
    search_category_edu: 'Educação Viária',
    search_category_signs: 'Sinais de Trânsito',
    search_category_campaigns: 'Campanhas Viárias',
    search_category_resources: 'Recursos & Manuais',
    search_category_eval: 'Simuladores & Testes',
    search_category_reports: 'Relatórios na Via',
    search_frequent: 'Pesquisas frequentes:',
    search_results_title: 'Resultados da Pesquisa',
    search_download_res: 'Baixar Arquivo Oficial',
    search_open_finder: 'Abrir pesquisador',
    search_prompt: 'O que você deseja consultar hoje no ViaNova?',

    // Dashboard
    dash_welcome_title: 'Portal de Educação e Certificação Viária',
    dash_welcome_sub: 'Prepare-se com normas de trânsito atualizadas. Faça simulados oficiais e relate ocorrências nas vias.',
    dash_quick_search: 'Pesquisa Rápida',
    dash_quick_simulator: 'Simulador RUNT',
    dash_stat_safety_score: 'Pontuação de Segurança',
    dash_stat_training_hrs: 'Horas de Treinamento',
    dash_stat_approved_exams: 'Simulados Aprovados',
    dash_stat_active_reports: 'Relatórios Ativos',
    dash_points_max: 'de 100 pts',
    dash_hours_unit: 'horas certificadas',
    dash_exams_unit: 'exames oficiais',
    dash_reports_unit: 'ocorrências na via',
    dash_modules_title: 'Módulos do Sistema ViaNova',
    dash_modules_sub: 'Ferramentas pedagógicas, simuladores oficiais e participação cidadã.',

    // Theme & Language Settings Modal
    settings_modal_title: 'Personalização de Aparência e Idioma',
    settings_modal_sub: 'Ajuste o tema visual, paleta de cores e o idioma da plataforma de acordo com a sua preferência.',
    settings_section_lang: 'Selecionar Idioma da Plataforma',
    settings_section_mode: 'Modo de Exibição',
    settings_mode_light: 'Modo Claro',
    settings_mode_dark: 'Modo Escuro (Noturno)',
    settings_section_color: 'Paleta de Cores de Destaque',
    settings_save_btn: 'Salvar e Aplicar Preferências',
    settings_applied_toast: 'Configurações de aparência e idioma salvas com sucesso.',
    settings_close: 'Fechar',

    // Languages Names
    lang_es: 'Español (Espanhol)',
    lang_en: 'English (Inglês)',
    lang_pt: 'Português (Brasil)',
    lang_fr: 'Français (Francês)',

    // Profile & ID
    profile_title: 'Credencial Digital & Perfil',
    profile_sub: 'Registro oficial do usuário no ecossistema de mobilidade ViaNova.',
    profile_digital_id: 'VIANOVA DRIVER DIGITAL ID',
    profile_registered_holder: 'Titular Registrado',
    profile_runt_id: 'Identificador RUNT',
    profile_license_cat: 'Categoria da CNH',
    profile_status_on_road: 'Situação na Via',
    profile_status_enabled: 'Habilitado 2026',
    profile_qr_badge: 'Validação QR Digital',
    profile_share: 'Compartilhar Credencial',
    profile_share_success: 'Link da credencial copiado com sucesso!',
    profile_user_data: 'Dados do Usuário',
    profile_full_name: 'Nome Completo',
    profile_email: 'E-mail',
    profile_type: 'Tipo de Perfil',
    profile_achievements: 'Distintivos de Mobilidade Segura',

    // Education & Signs
    edu_title: 'Módulos Pedagógicos de Trânsito',
    edu_sub: 'Treinamento interativo sobre segurança e legislação de trânsito.',
    signs_title: 'Catálogo de Sinalização de Trânsito',
    signs_sub: 'Padrões técnicos de sinalização regulamentar, de advertência e informativa.',
    quiz_title: 'Quiz Rápido de Conhecimento',
    sim_title: 'Simulador de Exame Teórico',
    reports_title: 'Relatórios e Ocorrências na Via',
  },
  fr: {
    // Brand & App
    appName: 'ViaNova',
    appSubtitle: 'Mobilité Intelligente',
    portalTagline: 'Système Intégral de Mobilité et Éducation Routière',
    footerCopyright: '© 2026 ViaNova. Conforme au Code de la Route et aux normes de sécurité routière.',
    
    // Navigation
    nav_home: 'Accueil',
    nav_search: 'Recherche',
    nav_education: 'Éducation Routière',
    nav_signs: 'Panneaux Routiers',
    nav_quiz: 'Quiz',
    nav_simulator: 'Simulateur d\'Examen',
    nav_reports: 'Signalements Routiers',
    nav_profile: 'Mon Profil',
    nav_login: 'Connexion',
    nav_register: 'Inscription',
    nav_logout: 'Déconnexion',
    nav_appearance: 'Apparence & Langue',
    
    // Quick Actions & Search
    search_placeholder: 'Rechercher règle, panneau (SR-01), vitesse, campagnes, lois...',
    search_title: 'Centre de Recherche Intelligent • ViaNova',
    search_heading: 'Trouvez instantanément ce dont vous avez besoin sur ViaNova',
    search_sub: 'Trouvez des modules d\'éducation routière, panneaux, campagnes citoyennes et manuels téléchargeables.',
    search_category_all: 'Tous les Contenus',
    search_category_edu: 'Éducation Routière',
    search_category_signs: 'Panneaux Routiers',
    search_category_campaigns: 'Campagnes de Sécurité',
    search_category_resources: 'Ressources & Manuels',
    search_category_eval: 'Simulateurs & Tests',
    search_category_reports: 'Signalements Routiers',
    search_frequent: 'Recherches fréquentes :',
    search_results_title: 'Résultats de Recherche',
    search_download_res: 'Télécharger le Document Officiel',
    search_open_finder: 'Ouvrir le moteur de recherche',
    search_prompt: 'Que souhaitez-vous consulter aujourd\'hui sur ViaNova ?',

    // Dashboard
    dash_welcome_title: 'Portail d\'Éducation et de Certification Routière',
    dash_welcome_sub: 'Préparez-vous avec les réglementations routières à jour. Entraînez-vous aux examens théoriques et signalez les incidents sur la voie publique.',
    dash_quick_search: 'Recherche Rapide',
    dash_quick_simulator: 'Simulateur RUNT',
    dash_stat_safety_score: 'Score de Sécurité',
    dash_stat_training_hrs: 'Heures de Formation',
    dash_stat_approved_exams: 'Examens Réussis',
    dash_stat_active_reports: 'Signalements Actifs',
    dash_points_max: 'sur 100 pts',
    dash_hours_unit: 'heures certifiées',
    dash_exams_unit: 'examens officiels',
    dash_reports_unit: 'incidents signalés',
    dash_modules_title: 'Modules du Système ViaNova',
    dash_modules_sub: 'Outils pédagogiques, simulateurs d\'examen et signalements citoyens.',

    // Theme & Language Settings Modal
    settings_modal_title: 'Personnalisation de l\'Apparence et de la Langue',
    settings_modal_sub: 'Personnalisez le thème visuel, les couleurs d\'accentuation et la langue de la plateforme à votre goût.',
    settings_section_lang: 'Sélectionner la Langue de la Plateforme',
    settings_section_mode: 'Mode d\'Affichage',
    settings_mode_light: 'Mode Clair',
    settings_mode_dark: 'Mode Sombre (Nuit)',
    settings_section_color: 'Palette de Couleur d\'Accentuation',
    settings_save_btn: 'Enregistrer et Appliquer les Préférences',
    settings_applied_toast: 'Paramètres d\'apparence et de langue enregistrés avec succès.',
    settings_close: 'Fermer',

    // Languages Names
    lang_es: 'Español (Espagnol)',
    lang_en: 'English (Anglais)',
    lang_pt: 'Português (Portugais)',
    lang_fr: 'Français (France)',

    // Profile & ID
    profile_title: 'Identifiant Numérique & Profil',
    profile_sub: 'Dossier officiel de l\'utilisateur dans l\'écosystème de mobilité ViaNova.',
    profile_digital_id: 'VIANOVA DRIVER DIGITAL ID',
    profile_registered_holder: 'Titulaire Enregistré',
    profile_runt_id: 'Identifiant RUNT',
    profile_license_cat: 'Catégorie de Permis',
    profile_status_on_road: 'Statut de Conduite',
    profile_status_enabled: 'Autorisé 2026',
    profile_qr_badge: 'Validation QR Numérique',
    profile_share: 'Partager le Profil',
    profile_share_success: 'Lien du permis copié dans le presse-papier !',
    profile_user_data: 'Informations de l\'Utilisateur',
    profile_full_name: 'Nom Complet',
    profile_email: 'Adresse E-mail',
    profile_type: 'Type de Profil',
    profile_achievements: 'Badges de Mobilité Sécurisée',

    // Education & Signs
    edu_title: 'Modules Pédagogiques de la Route',
    edu_sub: 'Formation interactive basée sur les règles et lois de circulation routière.',
    signs_title: 'Catalogue de la Signalisation Routière',
    signs_sub: 'Normes techniques des panneaux réglementaires, de danger et d\'indication.',
    quiz_title: 'Quiz Rapide de Connaissances',
    sim_title: 'Simulateur d\'Examen Théorique',
    reports_title: 'Incidents et Signalements Routiers',
  }
};
