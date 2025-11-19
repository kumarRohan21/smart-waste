const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photoUrl: String,
  lat: Number,
  lng: Number,
  address: String,
  wasteType: { type: String, enum: ['household','plastic','glass','bio','mixed'] },
  suggestedBin: { type: String, enum: ['blue','red','green','yellow'] },
  status: { type: String, enum: ['open','in_progress','resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  notes: String
});
module.exports = mongoose.model('Report', ReportSchema);
