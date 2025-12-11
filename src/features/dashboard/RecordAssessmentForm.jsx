import { useState } from 'react';
import Badge from '../../ui/Badge';

const DUMMY_INDICATORS = [
  {
    id: '1',
    name: 'Hypertension',
    readings: [
      { name: 'Systolic Blood Pressure', unit: 'mmHg', min: 0, max: 300 },
      { name: 'Diastolic Blood Pressure', unit: 'mmHg', min: 0, max: 300 },
    ],
  },
  {
    id: '2',
    name: 'Diabetes',
    readings: [
      { name: 'Random Blood Glucose', unit: 'mg/dL', min: 0, max: 600 },
      { name: 'Fasting Blood Glucose', unit: 'mg/dL', min: 0, max: 600 },
    ],
  },
  {
    id: '3',
    name: 'BMI',
    readings: [
      { name: 'Weight', unit: 'kg', min: 0, max: 300 },
      { name: 'Height', unit: 'm', min: 0, max: 3 },
    ],
  },
  {
    id: '4',
    name: 'Cholesterol',
    readings: [
      { name: 'Total Cholesterol', unit: 'mg/dL', min: 0, max: 400 },
      { name: 'HDL', unit: 'mg/dL', min: 0, max: 200 },
      { name: 'LDL', unit: 'mg/dL', min: 0, max: 400 },
    ],
  },
];

const DUMMY_CAMPAIGNS = [
  { id: '1', title: 'Nyarugenge District Campaign' },
  { id: '2', title: 'Gasabo Outreach' },
  { id: '3', title: 'Bugesera Mobile Campaign' },
];

export default function RecordAssessmentForm() {
  const [formData, setFormData] = useState({
    patientNumber: '',
    indicator: '',
    readings: {},
    campaignId: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const handleIndicatorChange = (e) => {
    const indicatorId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      indicator: indicatorId,
      readings: {},
    }));
    setSelectedIndicator(DUMMY_INDICATORS.find((ind) => ind.id === indicatorId));
  };

  const handleReadingChange = (readingName, value) => {
    setFormData((prev) => ({
      ...prev,
      readings: {
        ...prev.readings,
        [readingName]: parseFloat(value) || '',
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.patientNumber || !formData.indicator || !formData.campaignId) {
      alert('Please fill in all required fields');
      return;
    }

    if (Object.keys(formData.readings).length === 0) {
      alert('Please enter at least one reading');
      return;
    }

    // Simulate API call
    console.log('Assessment submitted:', formData);

    // Reset form
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        patientNumber: '',
        indicator: '',
        readings: {},
        campaignId: '',
        notes: '',
      });
      setSelectedIndicator(null);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className='max-w-2xl rounded-lg border border-slate-200 bg-white p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-slate-900'>Record Health Assessment</h2>
        <p className='mt-1 text-sm text-slate-500'>Enter patient readings for NCD screening indicators</p>
      </div>

      {submitted && (
        <div className='mb-4 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-700'>
          ✓ Assessment recorded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Patient Number */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>
            Patient Number
            <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            name='patientNumber'
            value={formData.patientNumber}
            onChange={handleInputChange}
            placeholder='e.g., PN-001'
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          />
        </div>

        {/* Screening Campaign */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>
            Screening Campaign
            <span className='text-rose-500'>*</span>
          </label>
          <select
            name='campaignId'
            value={formData.campaignId}
            onChange={handleInputChange}
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          >
            <option value=''>Select a campaign</option>
            {DUMMY_CAMPAIGNS.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.title}
              </option>
            ))}
          </select>
        </div>

        {/* Indicator Selection */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>
            Health Indicator
            <span className='text-rose-500'>*</span>
          </label>
          <select
            value={formData.indicator}
            onChange={handleIndicatorChange}
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          >
            <option value=''>Select an indicator</option>
            {DUMMY_INDICATORS.map((indicator) => (
              <option key={indicator.id} value={indicator.id}>
                {indicator.name}
              </option>
            ))}
          </select>
        </div>

        {/* Readings for Selected Indicator */}
        {selectedIndicator && (
          <div className='space-y-3 rounded-lg bg-slate-50 p-4'>
            <h3 className='text-sm font-semibold text-slate-900'>{selectedIndicator.name} Readings</h3>
            {selectedIndicator.readings.map((reading) => (
              <div key={reading.name}>
                <label className='block text-sm text-slate-700'>
                  {reading.name} ({reading.unit})
                </label>
                <input
                  type='number'
                  step='0.1'
                  min={reading.min}
                  max={reading.max}
                  value={formData.readings[reading.name] || ''}
                  onChange={(e) => handleReadingChange(reading.name, e.target.value)}
                  placeholder={`0 - ${reading.max}`}
                  className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                />
              </div>
            ))}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>Notes (Optional)</label>
          <textarea
            name='notes'
            value={formData.notes}
            onChange={handleInputChange}
            placeholder='Add any relevant notes about the assessment...'
            rows='3'
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          />
        </div>

        {/* Submit Button */}
        <div className='flex gap-3 pt-4'>
          <button
            type='submit'
            className='flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700'
          >
            Record Assessment
          </button>
          <button
            type='reset'
            onClick={() => {
              setFormData({
                patientNumber: '',
                indicator: '',
                readings: {},
                campaignId: '',
                notes: '',
              });
              setSelectedIndicator(null);
            }}
            className='rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
