/* RSS Level 3 Survey Assistant: shared data
   Edit this file to change chapters, elements, condition labels and standard wording.
   Used by the sidebar (taskpane.html) and by the template builder. */

var RSS = {

  /* Condition labels, in order. Colours are used in the sidebar, the report and the summary table. */
  labels: [
    { name: "Urgent / Safety Action Required", colour: "#B71C1C", note: "A safety risk or urgent defect needing prompt action." },
    { name: "Further Investigation Required", colour: "#D35400", note: "More information is needed before the extent of work is known." },
    { name: "Replacement / Renewal Required", colour: "#922B21", note: "The element is at or near the end of its life." },
    { name: "Overhaul / Major Repair Required", colour: "#A04000", note: "Several repairs together or one substantial repair." },
    { name: "Repair Required", colour: "#CA6F1E", note: "An individual repair is needed." },
    { name: "Not Inspected", colour: "#707B7C", note: "The element could not be seen or reached." },
    { name: "Monitor", colour: "#B7950B", note: "Keep under review; no work needed at present." },
    { name: "Upgrade Recommended", colour: "#1F618D", note: "Works fine but falls short of current expectations." },
    { name: "Routine Maintenance", colour: "#1E8449", note: "Normal upkeep only." },
    { name: "Performing Well", colour: "#196F3D", note: "No defects of note." },
    { name: "Legal", colour: "#6C3483", note: "For your legal adviser (Legal Matters chapter only)." },
    { name: "Information", colour: "#34495E", note: "Descriptive or advisory text." },
    { name: "Not Applicable", colour: "#909497", note: "The element is not present." }
  ],

  /* Report chapters and their elements.
     rec: false means the element has no "Recommendations and Remedial Works" subheading. */
  chapters: [
    { code: "A", name: "About the Inspection", front: true, elements: [] },
    { code: "B", name: "Overall Opinion and Summary", front: true, elements: [] },
    { code: "C", name: "About the Property", front: true, elements: [] },
    { code: "D", name: "Outside the Property", elements: [
      { code: "D1", name: "Chimney Stacks and Parapet Walls" },
      { code: "D2", name: "Roof Coverings" },
      { code: "D3", name: "Rainwater Goods, Fascias and Soffits" },
      { code: "D4", name: "Main Walls" },
      { code: "D5", name: "Windows and Doors" },
      { code: "D6", name: "Other External Joinery and Decoration" },
      { code: "D7", name: "Other External Features" },
      { code: "D8", name: "Other" }
    ]},
    { code: "E", name: "Inside the Property", elements: [
      { code: "E1", name: "Roof Space and Roof Structure" },
      { code: "E2", name: "Ceilings" },
      { code: "E3", name: "Walls and Partitions" },
      { code: "E4", name: "Floors" },
      { code: "E5", name: "Fireplaces, Chimney Breasts and Flues" },
      { code: "E6", name: "Built-in Fittings" },
      { code: "E7", name: "Woodwork" },
      { code: "E8", name: "Bathroom Fittings" },
      { code: "E9", name: "Other" }
    ]},
    { code: "F", name: "Services", elements: [
      { code: "F1", name: "Electricity" },
      { code: "F2", name: "Gas and Oil" },
      { code: "F3", name: "Water" },
      { code: "F4", name: "Heating" },
      { code: "F5", name: "Water Heating" },
      { code: "F6", name: "Drainage" },
      { code: "F7", name: "Other Services" }
    ]},
    { code: "G", name: "Grounds", elements: [
      { code: "G1", name: "Garage" },
      { code: "G2", name: "Outbuildings" },
      { code: "G3", name: "Grounds and Boundaries" },
      { code: "G4", name: "Other" }
    ]},
    { code: "H", name: "Legal Matters", elements: [
      { code: "H1", name: "Matters for Your Legal Adviser", rec: false }
    ]},
    { code: "I", name: "Environmental Matters", elements: [
      { code: "I1", name: "Flood Risk", rec: false },
      { code: "I2", name: "Radon", rec: false },
      { code: "I3", name: "Ground Stability and Trees", rec: false },
      { code: "I4", name: "Invasive Plants", rec: false },
      { code: "I5", name: "Other Environmental Matters", rec: false }
    ]},
    { code: "J", name: "Thermal Insulation and Energy Efficiency", elements: [
      { code: "J1", name: "Insulation and Energy Efficiency", rec: false }
    ]},
    { code: "K", name: "Health and Safety", elements: [
      { code: "K1", name: "Health and Safety Matters" }
    ]},
    { code: "L", name: "What To Do Next", front: true, elements: [] },
    { code: "M", name: "Surveyor's Declaration", front: true, elements: [] }
  ],

  /* Standard wording library. kind: "para" inserts a paragraph, "bullet" inserts a bullet point. */
  wording: [
    /* Limitations */
    { cat: "Limitations", title: "Dry weather", kind: "para",
      text: "It was not raining at the time of my inspection, so I am unable to comment on the full weather tightness of the roofs, rainwater goods and external walls." },
    { cat: "Limitations", title: "Vacant with some furniture", kind: "para",
      text: "The property was vacant at the time of my inspection, although some furniture and built-in fittings remained. These restricted my view of parts of the floors, walls and skirtings, and defects may be present in these areas." },
    { cat: "Limitations", title: "Occupied and furnished", kind: "para",
      text: "The property was occupied and fully furnished at the time of my inspection. Floor coverings, furniture and stored items restricted my view of the floors, walls and skirtings, and I did not move heavy furniture or lift fitted floor coverings." },
    { cat: "Limitations", title: "Concealed areas", kind: "para",
      text: "I have not inspected parts of the property that were covered, unexposed or not reasonably accessible. I cannot confirm that these areas are free from defects." },
    { cat: "Limitations", title: "Roof seen from ground and drone", kind: "para",
      text: "I inspected the roof from ground level and with the aid of a drone. Defects that are only visible at close quarters may not have been identified." },

    /* Outside */
    { cat: "Outside", title: "Chimneys have no DPC", kind: "bullet",
      text: "Older chimney stacks were usually built without a damp proof course and are exposed to the weather on all sides. They need regular inspection and maintenance to prevent damp reaching the inside of the property." },
    { cat: "Outside", title: "Flat roofs can fail suddenly", kind: "bullet",
      text: "Flat roofs can fail suddenly and without warning, even where they appear to be in satisfactory condition. Regular inspection and maintenance is important." },
    { cat: "Outside", title: "Solid walls: lime mortar", kind: "bullet",
      text: "Solid walls need to breathe. Any repointing or repairs should be carried out in a lime-based mortar, not a hard cement mortar, which can trap moisture and damage the brickwork." },
    { cat: "Outside", title: "Cavity walls: mortar", kind: "bullet",
      text: "Any repointing to the cavity walls should be carried out in a mortar mix to match the existing, and the work should be completed by a competent bricklayer." },
    { cat: "Outside", title: "Clear gutters", kind: "bullet",
      text: "Gutters and downpipes should be cleared at least once a year, and after the autumn leaf fall where there are trees nearby, to prevent overflowing and damp to the walls." },
    { cat: "Outside", title: "Redecoration cycle", kind: "bullet",
      text: "External joinery should be redecorated every five to seven years to protect the timber and prevent decay." },
    { cat: "Outside", title: "NFRC Competent Person (roof replacement)", kind: "bullet",
      text: "Roof replacement should be carried out by a contractor registered with the NFRC Competent Person Scheme, who can self certify the work under the Building Regulations." },

    /* Inside */
    { cat: "Inside", title: "Sealant to kitchens and bathrooms", kind: "bullet",
      text: "Sealant around worktops, baths, basins and showers should be checked regularly and renewed when it starts to fail, to prevent water getting behind the fittings." },
    { cat: "Inside", title: "Defects under baths and trays", kind: "bullet",
      text: "Leaks and timber decay can occur unseen beneath baths and shower trays. I could not see these areas, and you should be aware that defects may be present." },
    { cat: "Inside", title: "Dated kitchen or bathroom", kind: "bullet",
      text: "The fittings are serviceable but dated. You should assess them for your own taste, and you may wish to upgrade them." },
    { cat: "Inside", title: "Roof space partly boarded", kind: "para",
      text: "The roof space was partly boarded and insulated, which restricted my view of the ceiling joists and the top of the walls." },

    /* Services */
    { cat: "Services", title: "Services not tested", kind: "para",
      text: "I did not test any of the services. Most of the pipework, wiring and other parts of the services are concealed, and I can only comment on the parts that were visible. I recommend that every service is checked by a suitably qualified specialist before you commit to the purchase." },
    { cat: "Services", title: "Electrics: EICR", kind: "bullet",
      text: "Arrange an Electrical Installation Condition Report (EICR) by a registered electrician before you commit to the purchase." },
    { cat: "Services", title: "Gas: safety check", kind: "bullet",
      text: "Arrange a gas safety check and service of the boiler and gas appliances by a Gas Safe registered engineer before you commit to the purchase." },
    { cat: "Services", title: "Ask for service records", kind: "bullet",
      text: "Ask the seller for the service history and any certificates for the heating system and electrical installation." },
    { cat: "Services", title: "CCTV drain survey (optional)", kind: "bullet",
      text: "For peace of mind, you may wish to arrange a CCTV drainage survey, as most of the drainage is underground and could not be seen." },
    { cat: "Services", title: "Shared private sewers", kind: "para",
      text: "Since the Private Sewers Transfer Regulations 2011, drains shared with neighbours that run outside your boundary are usually the responsibility of the local water company. Drains that serve only your property and sit within your boundary remain your responsibility." },

    /* Environmental */
    { cat: "Environmental", title: "Japanese knotweed limitation", kind: "para",
      text: "I did not see any Japanese knotweed within the boundaries of the property. My inspection was visual only. Knotweed can die back seasonally, rhizomes can lie dormant below ground, and it can be hidden in concealed or overgrown areas or on neighbouring land. I cannot give any warranty that the property and its surroundings are free from Japanese knotweed." },
    { cat: "Environmental", title: "Asbestos: age of property", kind: "para",
      text: "Given the age of the property, asbestos-containing materials may be present in areas such as textured ceiling coatings, floor tiles, boxing, flue pipes and soffits. Before any refurbishment or demolition work, a Refurbishment and Demolition asbestos survey is required under the Control of Asbestos Regulations 2012." },
    { cat: "Environmental", title: "Textured coatings trigger", kind: "bullet",
      text: "Textured coatings were noted. Coatings of this type applied before 2000 may contain asbestos. They should not be sanded, scraped or drilled until they have been tested." },

    /* Legal */
    { cat: "Legal", title: "Building Regulations: owner responsible", kind: "bullet",
      text: "Compliance with the Building Regulations is ultimately the homeowner's responsibility. Your contractor should carry out the work so it can easily be signed off, and should keep photographic records of concealed work, such as how a roof was insulated." },
    { cat: "Legal", title: "Ask for alteration approvals", kind: "bullet",
      text: "Your legal adviser should confirm that the necessary planning and Building Regulations approvals were obtained for alterations to the property, and that completion certificates are available." },
    { cat: "Legal", title: "Guarantees and warranties", kind: "bullet",
      text: "Your legal adviser should ask for copies of any guarantees and warranties for work carried out at the property, and confirm they can be transferred to you." },

    /* Health and Safety */
    { cat: "Health and Safety", title: "Nothing noted", kind: "para",
      text: "No health and safety issues were noted by the surveyor." },
    { cat: "Health and Safety", title: "Smoke and CO alarms", kind: "bullet",
      text: "Make sure working smoke alarms are fitted on every floor and a carbon monoxide alarm is fitted in any room with a fuel-burning appliance." },

    /* Security */
    { cat: "General", title: "Security outside scope", kind: "para",
      text: "Security is outside the scope of this survey. You may wish to review the locks, alarms and external lighting after you move in, and check that your insurer's requirements are met." },
    { cat: "General", title: "Obtain quotations", kind: "bullet",
      text: "Obtain quotations from suitably qualified contractors for the work described before you commit to the purchase." },

    /* Property age */
    { cat: "Property Age", title: "Pre-1919", kind: "para",
      text: "Properties of this era were usually built with solid walls, lime mortars and shallow foundations. Typical issues include damp from bridged or absent damp proof courses, failure of original roof coverings and fixings, movement from shallow foundations, decay to timber floors and lintels, and the use of modern cement renders and paints that trap moisture." },
    { cat: "Property Age", title: "1919 to 1944", kind: "para",
      text: "Properties of this era were often built with early cavity or solid walls. Typical issues include corrosion of metal wall ties, original roof coverings nearing the end of their life, bay window movement, and dated wiring and plumbing where not yet renewed." },
    { cat: "Property Age", title: "1945 to 1964", kind: "para",
      text: "Properties of this era may use non-traditional construction methods and materials introduced after the war. Typical issues include asbestos-containing materials, concrete roof tiles adding weight to the roof structure, wall tie corrosion and early flat roof coverings." },
    { cat: "Property Age", title: "1965 to 1990", kind: "para",
      text: "Properties of this era were usually built with cavity walls. Typical issues include asbestos-containing materials, trussed rafter roofs lacking bracing, flat roof failures, early double glazing at the end of its life, and limited insulation by modern standards." },
    { cat: "Property Age", title: "Post 1990", kind: "para",
      text: "Properties of this era are of modern construction. Typical issues include settlement cracking in new plaster, shrinkage of timber, failing sealants and window seals, and the need to check that any warranty, such as NHBC cover, remains in place." }
  ],

  /* House rules given to the AI writer. Edit freely. */
  aiRules: [
    "Write in the first person singular (I, my), in plain English, as a building surveyor.",
    "Write only from the surveyor's site notes. Do not invent defects, measurements or findings.",
    "Keep it short and sharp. Do not describe every fitting or construction detail.",
    "Never use em dashes or en dashes. Use commas or full stops.",
    "Never use the word 'good'. Use 'satisfactory' or similar.",
    "Never use cost words such as 'cheap' or 'inexpensive'. Show any cost with the pound sign.",
    "Never mention binoculars, floor area, valuations or whether the property is suitable to buy.",
    "Never call the surveyor a chartered surveyor.",
    "Do not offer to review quotations, drawings or contractors' responses.",
    "Structural engineer input is a recommendation for the client to arrange, not the surveyor's service.",
    "Untested services get Further Investigation Required, unless there is evidence of danger.",
    "Serviceable but dated kitchens and bathrooms get Routine Maintenance with 'assess for your own taste, you may wish to upgrade'.",
    "Solid wall repointing must specify lime mortar. Flat roofs carry the caveat that they can fail suddenly and without warning.",
    "Left and right are as facing the front of the property from the main road."
  ]
};

if (typeof module !== "undefined") { module.exports = RSS; }
