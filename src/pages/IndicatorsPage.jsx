import { useState } from 'react';
import { FiSearch, FiTrendingUp } from 'react-icons/fi';

// Comprehensive NCDC Indicators data
const DUMMY_INDICATORS = [
  {
    id: '1',
    name: 'Hypertension',
    description: 'High blood pressure screening and classification',
    readings: [
      {
        name: 'Systolic Blood Pressure',
        unit: 'mmHg',
        normal: '< 120',
        elevated: '120-129 and < 80',
        stage1: '130-139 or 80-89',
        stage2: '≥ 140 or ≥ 90',
      },
      {
        name: 'Diastolic Blood Pressure',
        unit: 'mmHg',
        normal: '< 80',
        elevated: '< 80',
        stage1: '80-89',
        stage2: '≥ 90',
      },
    ],
    riskFactors: ['Obesity', 'High sodium intake', 'Stress', 'Age', 'Family history'],
    prevalence: '35%',
    casesRecorded: 342,
  },
  {
    id: '2',
    name: 'Diabetes',
    description: 'Blood glucose monitoring and diabetes screening',
    readings: [
      {
        name: 'Random Blood Glucose',
        unit: 'mg/dL',
        normal: '< 140',
        prediabetes: '140-199',
        diabetes: '≥ 200',
      },
      {
        name: 'Fasting Blood Glucose',
        unit: 'mg/dL',
        normal: '< 100',
        prediabetes: '100-125',
        diabetes: '≥ 126',
      },
    ],
    riskFactors: ['Obesity', 'Sedentary lifestyle', 'Age > 45', 'Family history', 'Hypertension'],
    prevalence: '12%',
    casesRecorded: 156,
  },
  {
    id: '3',
    name: 'BMI (Body Mass Index)',
    description: 'Weight status classification',
    readings: [
      {
        name: 'Body Mass Index',
        unit: 'kg/m²',
        underweight: '< 18.5',
        normal: '18.5-24.9',
        overweight: '25.0-29.9',
        obese: '≥ 30.0',
      },
    ],
    riskFactors: ['Unhealthy diet', 'Lack of physical activity', 'Genetic factors', 'Medications'],
    prevalence: '28%',
    casesRecorded: 298,
  },
  {
    id: '4',
    name: 'Cholesterol',
    description: 'Lipid profile and cardiovascular risk assessment',
    readings: [
      {
        name: 'Total Cholesterol',
        unit: 'mg/dL',
        desirable: '< 200',
        borderline: '200-239',
        high: '≥ 240',
      },
      {
        name: 'HDL (Good Cholesterol)',
        unit: 'mg/dL',
        low: '< 40 (male), < 50 (female)',
        desirable: '≥ 60',
      },
      {
        name: 'LDL (Bad Cholesterol)',
        unit: 'mg/dL',
        optimal: '< 100',
        nearOptimal: '100-129',
        borderline: '130-159',
        high: '160-189',
        veryHigh: '≥ 190',
      },
    ],
    riskFactors: ['Unhealthy diet', 'Lack of exercise', 'Smoking', 'Age', 'Family history'],
    prevalence: '22%',
    casesRecorded: 187,
  },
  {
    id: '5',
    name: 'Respiratory Health',
    description: 'Lung function and respiratory condition screening',
    readings: [
      {
        name: 'Peak Flow',
        unit: 'L/min',
        normal: '> 400',
        reduced: '200-400',
        severe: '< 200',
      },
    ],
    riskFactors: ['Smoking', 'Air pollution', 'Occupational exposure', 'Family history'],
    prevalence: '8%',
    casesRecorded: 67,
  },
  {
    id: '6',
    name: 'Mental Health Screening',
    description: 'Depression and anxiety assessment',
    readings: [
      {
        name: 'PHQ-9 Score',
        unit: 'Points',
        none: '0-4',
        mild: '5-9',
        moderate: '10-14',
        moderateToSevere: '15-19',
        severe: '20-27',
      },
    ],
    riskFactors: ['Chronic illness', 'Social isolation', 'Stress', 'Substance use', 'Trauma'],
    prevalence: '15%',
    casesRecorded: 89,
  },
];

export default function IndicatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const filteredIndicators = DUMMY_INDICATORS.filter(
    (indicator) =>
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>NCDC Indicators</h1>
        <p className='mt-1 text-slate-500'>Health indicators and screening parameters for NCD assessment</p>
      </div>

      {/* Search */}
      <div className='relative'>
        <FiSearch className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
        <input
          type='text'
          placeholder='Search indicators...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
        />
      </div>

      {!selectedIndicator ? (
        <>
          {/* Results Count */}
          <div className='flex items-center justify-between'>
            <p className='text-sm text-slate-500'>
              Showing <span className='font-semibold'>{filteredIndicators.length}</span> of{' '}
              <span className='font-semibold'>{DUMMY_INDICATORS.length}</span> indicators
            </p>
          </div>

          {/* Indicators Grid */}
          <div className='grid gap-4 md:grid-cols-2'>
            {filteredIndicators.length > 0 ? (
              filteredIndicators.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => setSelectedIndicator(indicator)}
                  className='rounded-lg border border-slate-200 bg-white p-5 text-left hover:shadow-lg hover:border-emerald-300 transition'
                >
                  <div className='flex items-start justify-between gap-3 mb-3'>
                    <div>
                      <h3 className='text-lg font-semibold text-slate-900'>{indicator.name}</h3>
                      <p className='mt-1 text-sm text-slate-500'>{indicator.description}</p>
                    </div>
                    <FiTrendingUp className='h-5 w-5 text-emerald-600 mt-1 shrink-0' />
                  </div>

                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Cases Recorded:</span>
                      <span className='font-semibold text-slate-900'>{indicator.casesRecorded}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Prevalence:</span>
                      <span className='font-semibold text-slate-900'>{indicator.prevalence}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Reading Types:</span>
                      <span className='font-semibold text-slate-900'>{indicator.readings.length}</span>
                    </div>
                  </div>

                  <div className='mt-4 text-xs text-slate-500'>Click to view detailed specifications</div>
                </button>
              ))
            ) : (
              <div className='col-span-full rounded-lg border border-slate-200 bg-slate-50 p-8 text-center'>
                <p className='text-sm text-slate-500'>No indicators found matching your search</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Indicator Detail View */}
          <div className='rounded-lg border border-slate-200 bg-white p-6'>
            <button
              onClick={() => setSelectedIndicator(null)}
              className='mb-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700'
            >
              ← Back to Indicators
            </button>

            <div className='mb-6'>
              <h2 className='text-3xl font-bold text-slate-900'>{selectedIndicator.name}</h2>
              <p className='mt-2 text-slate-500'>{selectedIndicator.description}</p>
            </div>

            {/* Key Metrics */}
            <div className='grid gap-4 sm:grid-cols-3 mb-6'>
              <div className='rounded-lg bg-slate-50 p-4'>
                <p className='text-sm text-slate-600'>Cases Recorded</p>
                <p className='mt-1 text-2xl font-bold text-slate-900'>{selectedIndicator.casesRecorded}</p>
              </div>
              <div className='rounded-lg bg-slate-50 p-4'>
                <p className='text-sm text-slate-600'>Prevalence Rate</p>
                <p className='mt-1 text-2xl font-bold text-slate-900'>{selectedIndicator.prevalence}</p>
              </div>
              <div className='rounded-lg bg-slate-50 p-4'>
                <p className='text-sm text-slate-600'>Reading Types</p>
                <p className='mt-1 text-2xl font-bold text-slate-900'>{selectedIndicator.readings.length}</p>
              </div>
            </div>

            {/* Risk Factors */}
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-slate-900 mb-3'>Risk Factors</h3>
              <div className='flex flex-wrap gap-2'>
                {selectedIndicator.riskFactors.map((factor) => (
                  <span
                    key={factor}
                    className='inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700 border border-amber-100'
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading Specifications */}
            <div>
              <h3 className='text-lg font-semibold text-slate-900 mb-4'>Reading Specifications</h3>
              <div className='space-y-4'>
                {selectedIndicator.readings.map((reading, idx) => (
                  <div key={idx} className='rounded-lg border border-slate-200 p-4'>
                    <h4 className='font-semibold text-slate-900'>
                      {reading.name} ({reading.unit})
                    </h4>
                    <div className='mt-3 grid gap-2 sm:grid-cols-2'>
                      {Object.entries(reading)
                        .filter(([key]) => !['name', 'unit'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className='text-sm'>
                            <span className='capitalize text-slate-600'>{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                            <span className='font-semibold text-slate-900'>{value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
