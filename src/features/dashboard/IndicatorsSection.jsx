import Badge from '../../ui/Badge';
import Table from '../../ui/Table';

export default function IndicatorsSection() {
  const indicatorRows = [
    {
      name: 'Hypertension',
      reading: 'Systolic & Diastolic BP',
      cases: '8',
      classification: 'Elevated / Stage 1 / Stage 2',
    },
    {
      name: 'Diabetes',
      reading: 'Random Blood Glucose',
      cases: '6',
      classification: 'Normal / Pre-diabetes / Diabetes',
    },
    {
      name: 'BMI',
      reading: 'Body Mass Index',
      cases: '10',
      classification: 'Normal / Overweight / Obese',
    },
  ];

  return (
    <section className='space-y-4 surface-card p-5 border border-slate-200'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-1'>NCDC Indicators</h3>
          <p className='text-sm text-slate-500'>Reference values for field teams</p>
        </div>
        <Badge>From /api/v1/indicators</Badge>
      </div>
      <Table
        columns={[
          { key: 'name', label: 'Indicator' },
          { key: 'reading', label: 'Measurement Type' },
          { key: 'cases', label: 'Cases' },
          { key: 'classification', label: 'Classifications' },
        ]}
        rows={indicatorRows}
      />
    </section>
  );
}
