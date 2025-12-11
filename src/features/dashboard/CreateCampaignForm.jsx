import { useState } from 'react';

const RWANDA_LOCATIONS = {
  'Kigali City': {
    districts: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
  },
  'Northern Province': {
    districts: ['Burera', 'Gicumbi', 'Musanze', 'Ruhengeri'],
  },
  'Southern Province': {
    districts: ['Bugesera', 'Gisagara', 'Huye', 'Nyamagabe', 'Nyanza', 'Ruhango'],
  },
  'Eastern Province': {
    districts: ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Rwamagana'],
  },
  'Western Province': {
    districts: ['Karongi', 'Kibuye', 'Kusama', 'Nyabihu', 'Nyamasheke', 'Rubavu'],
  },
};

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '08:00',
    endTime: '17:00',
    location: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [districts, setDistricts] = useState([]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setFormData((prev) => ({
      ...prev,
      province,
      district: '',
      sector: '',
      cell: '',
      village: '',
    }));
    setDistricts(RWANDA_LOCATIONS[province]?.districts || []);
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
    if (!formData.title || !formData.startDate || !formData.endDate || !formData.province) {
      alert('Please fill in all required fields');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('End date must be after start date');
      return;
    }

    // Simulate API call
    console.log('Campaign created:', formData);

    // Reset form
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '08:00',
        endTime: '17:00',
        location: '',
        province: '',
        district: '',
        sector: '',
        cell: '',
        village: '',
      });
      setDistricts([]);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className='max-w-2xl rounded-lg border border-slate-200 bg-white p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-slate-900'>Create Screening Campaign</h2>
        <p className='mt-1 text-sm text-slate-500'>Plan and schedule a new NCD screening campaign</p>
      </div>

      {submitted && (
        <div className='mb-4 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-700'>
          ✓ Campaign created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Campaign Title */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>
            Campaign Title
            <span className='text-rose-500'>*</span>
          </label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            placeholder='e.g., NCDC Screening Campaign Nyarugenge District'
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          />
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            placeholder='Describe the purpose and scope of this campaign...'
            rows='3'
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          />
        </div>

        {/* Dates */}
        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label className='block text-sm font-semibold text-slate-900'>
              Start Date
              <span className='text-rose-500'>*</span>
            </label>
            <input
              type='date'
              name='startDate'
              value={formData.startDate}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-slate-900'>
              End Date
              <span className='text-rose-500'>*</span>
            </label>
            <input
              type='date'
              name='endDate'
              value={formData.endDate}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Times */}
        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label className='block text-sm font-semibold text-slate-900'>Start Time</label>
            <input
              type='time'
              name='startTime'
              value={formData.startTime}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-slate-900'>End Time</label>
            <input
              type='time'
              name='endTime'
              value={formData.endTime}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Location Name */}
        <div>
          <label className='block text-sm font-semibold text-slate-900'>Location Name</label>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleInputChange}
            placeholder='e.g., Kigali University Teaching Hospital (CHUK)'
            className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
          />
        </div>

        {/* Address Section */}
        <div className='space-y-3 rounded-lg bg-slate-50 p-4'>
          <h3 className='text-sm font-semibold text-slate-900'>Campaign Address</h3>

          {/* Province */}
          <div>
            <label className='block text-sm font-semibold text-slate-900'>
              Province
              <span className='text-rose-500'>*</span>
            </label>
            <select
              name='province'
              value={formData.province}
              onChange={handleProvinceChange}
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            >
              <option value=''>Select province</option>
              {Object.keys(RWANDA_LOCATIONS).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          {districts.length > 0 && (
            <div>
              <label className='block text-sm font-semibold text-slate-900'>District</label>
              <select
                name='district'
                value={formData.district}
                onChange={handleInputChange}
                className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
              >
                <option value=''>Select district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sector */}
          <div>
            <label className='block text-sm font-semibold text-slate-900'>Sector</label>
            <input
              type='text'
              name='sector'
              value={formData.sector}
              onChange={handleInputChange}
              placeholder='e.g., Muhima'
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>

          {/* Cell */}
          <div>
            <label className='block text-sm font-semibold text-slate-900'>Cell</label>
            <input
              type='text'
              name='cell'
              value={formData.cell}
              onChange={handleInputChange}
              placeholder='e.g., Kiyovu'
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>

          {/* Village */}
          <div>
            <label className='block text-sm font-semibold text-slate-900'>Village</label>
            <input
              type='text'
              name='village'
              value={formData.village}
              onChange={handleInputChange}
              placeholder='e.g., Kiyovu Village'
              className='mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex gap-3 pt-4'>
          <button
            type='submit'
            className='flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700'
          >
            Create Campaign
          </button>
          <button
            type='reset'
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                startTime: '08:00',
                endTime: '17:00',
                location: '',
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
              });
              setDistricts([]);
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
