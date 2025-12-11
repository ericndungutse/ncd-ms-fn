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
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      {/* Header */}
      <div className='surface-card p-5 bg-white border border-slate-200'>
        <h1 className='text-2xl font-semibold text-slate-900 mb-1'>NCDC Indicators</h1>
        <p className='text-slate-600 text-sm'>
          Health indicators and screening parameters for NCD assessment
        </p>
      </div>

      {/* Search */}
      <div className='relative'>
        <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
        <input
          type='text'
          placeholder='Search indicators...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full rounded border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors'
        />
      </div>

      {!selectedIndicator ? (
        <>
          {/* Results Count */}
          <div className='flex items-center justify-between'>
            <p className='text-sm text-slate-600'>
              Showing <span className='font-bold text-slate-900'>{filteredIndicators.length}</span> of{' '}
              <span className='font-bold text-slate-900'>{DUMMY_INDICATORS.length}</span> indicators
            </p>
          </div>

          {/* Indicators Grid */}
          <div className='grid gap-4 md:grid-cols-2'>
            {filteredIndicators.length > 0 ? (
              filteredIndicators.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => setSelectedIndicator(indicator)}
                  className='group rounded border border-slate-200 bg-white p-5 text-left hover:bg-slate-50 transition-colors'
                >
                  <div className='flex items-start justify-between gap-3 mb-3'>
                    <div>
                      <h3 className='text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors duration-300'>
                        {indicator.name}
                      </h3>
                      <p className='mt-2 text-sm text-slate-600 leading-relaxed'>{indicator.description}</p>
                    </div>
                    <div className='p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-300'>
                      <FiTrendingUp className='h-5 w-5 shrink-0' />
                    </div>
                  </div>

                  <div className='space-y-3 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Cases Recorded:</span>
                      <span className='font-bold text-slate-900'>{indicator.casesRecorded}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Prevalence:</span>
                      <span className='font-bold text-teal-600'>{indicator.prevalence}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-slate-600'>Reading Types:</span>
                      <span className='font-bold text-slate-900'>{indicator.readings.length}</span>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center gap-2'>
                    Click to view detailed specifications
                    <span className='text-teal-600 group-hover:translate-x-1 transition-transform duration-300'>→</span>
                  </div>
                </button>
              ))
            ) : (
              <div className='col-span-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center'>
                <div className='mx-auto max-w-md'>
                  <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center'>
                    <FiSearch className='h-8 w-8 text-slate-400' />
                  </div>
                  <p className='text-sm font-semibold text-slate-900 mb-1'>No indicators found</p>
                  <p className='text-sm text-slate-500'>Try adjusting your search</p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Indicator Detail View */}
          <div className='rounded-xl border border-slate-200 bg-white p-8 shadow-soft animate-scale-in'>
            <button
              onClick={() => setSelectedIndicator(null)}
              className='group mb-6 flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors duration-200'
            >
              <span className='group-hover:-translate-x-1 transition-transform duration-200'>←</span>
              Back to Indicators
            </button>

            <div className='mb-8'>
              <h2 className='text-4xl font-bold text-slate-900 mb-3'>{selectedIndicator.name}</h2>
              <p className='text-slate-600 text-lg leading-relaxed'>{selectedIndicator.description}</p>
            </div>

            {/* Key Metrics */}
            <div className='grid gap-6 sm:grid-cols-3 mb-8'>
              <div className='rounded-xl bg-linear-to-br from-teal-50 to-emerald-50 p-6 border border-teal-100'>
                <p className='text-sm font-medium text-slate-600 mb-2'>Cases Recorded</p>
                <p className='text-3xl font-bold text-slate-900'>{selectedIndicator.casesRecorded}</p>
              </div>
              <div className='rounded-xl bg-linear-to-br from-amber-50 to-orange-50 p-6 border border-amber-100'>
                <p className='text-sm font-medium text-slate-600 mb-2'>Prevalence Rate</p>
                <p className='text-3xl font-bold text-slate-900'>{selectedIndicator.prevalence}</p>
              </div>
              <div className='rounded-xl bg-linear-to-br from-slate-50 to-slate-100 p-6 border border-slate-200'>
                <p className='text-sm font-medium text-slate-600 mb-2'>Reading Types</p>
                <p className='text-3xl font-bold text-slate-900'>{selectedIndicator.readings.length}</p>
              </div>
            </div>

            {/* Risk Factors */}
            <div className='mb-8'>
              <h3 className='text-xl font-bold text-slate-900 mb-4'>Risk Factors</h3>
              <div className='flex flex-wrap gap-3'>
                {selectedIndicator.riskFactors.map((factor) => (
                  <span
                    key={factor}
                    className='inline-flex items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200'
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading Specifications */}
            <div>
              <h3 className='text-xl font-bold text-slate-900 mb-4'>Reading Specifications</h3>
              <div className='space-y-5'>
                {selectedIndicator.readings.map((reading, idx) => (
                  <div
                    key={idx}
                    className='rounded-xl border border-slate-200 p-6 bg-slate-50/50 hover:shadow-md transition-shadow duration-300'
                  >
                    <h4 className='font-bold text-slate-900 mb-4 text-lg'>
                      {reading.name} <span className='text-teal-600'>({reading.unit})</span>
                    </h4>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      {Object.entries(reading)
                        .filter(([key]) => !['name', 'unit'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className='text-sm bg-white rounded-lg p-3 border border-slate-200'>
                            <span className='capitalize text-slate-600 font-medium block mb-1'>
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className='font-bold text-slate-900'>{value}</span>
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
