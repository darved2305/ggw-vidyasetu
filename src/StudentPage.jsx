import React from 'react';
import NavbarSection from './components/NavbarSection';
import SidebarSection from './components/SidebarSection';
import CertificatesSection from './components/CertificatesSection';
import TestRecordsSection from './components/TestRecordsSection';

const StudentPage = () => {
  return (
    <>
      <NavbarSection />
      <div style={{ display: 'flex', background: '#f5f8fa', minHeight: '100vh', padding: '2rem' }}>
        <div style={{ minWidth: '260px', marginRight: '2rem' }}>
          <SidebarSection />
        </div>
        <div style={{ flex: 1, maxWidth: '1100px', background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(60,100,180,0.07)' }}>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 2 }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.7rem' }}>Contribute – Be Part of a National Mission!</h2>
              <p style={{ marginBottom: '1rem', color: '#222', fontSize: '1rem' }}>
                Go beyond academics! Participate in national initiatives like NSS, NCC, Fit India, and Swachh Bharat. Contribute to society, earn credits, and build your leadership profile recognized by the Government of India.
              </p>
              <button style={{ background: '#3b6fc2', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1.2rem' }}>Explore Opportunities →</button>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Semester 3 of 8</div>
              <div style={{ background: '#e3eefd', borderRadius: '8px', padding: '0.7rem', marginBottom: '0.7rem', display: 'inline-block' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>September</div>
                <table style={{ fontSize: '0.95rem', margin: '0 auto' }}>
                  <tbody>
                    <tr style={{ color: '#3b6fc2', fontWeight: 'bold' }}>
                      <td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>
                    </tr>
                    <tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                    <tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                    <tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr>
                    <tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr>
                    <tr><td>29</td><td>30</td><td></td><td></td><td></td><td></td><td></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <CertificatesSection />
          <div style={{ marginTop: '2.5rem' }}>
            <TestRecordsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
